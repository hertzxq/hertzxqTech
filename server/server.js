require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require("./db");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const productData = require("../client/src/components/datas/productData");

const port = 5000;
app.use(cors());
app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.error('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await db.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            console.error('Invalid username:', username);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.error('Invalid password for username:', username);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/cart', authenticateToken, (req, res) => {
    const { productId, quantity } = req.body;
    console.log('Request body:', req.body); // Логирование запроса
    const product = productData[productId];
    if (!product) {
        console.error('Product not found:', productId); // Логирование ошибки
        return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product added to cart:', product, 'Quantity:', quantity);

    res.status(201).json({ message: 'Product added to cart successfully', product, quantity });
});

app.post('/order', authenticateToken, async (req, res) => {
    const { items } = req.body;
    const userId = req.user.userId;
    const totalPrice = items.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        if (isNaN(itemPrice)) {
            console.error(`Invalid price for item ${item.title}: ${item.price}`);
            return total;
        }
        return total + itemPrice * item.quantity;
    }, 0);

    try {
        const result = await db.query(
            'INSERT INTO orders (user_id, items, price, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, JSON.stringify(items), totalPrice, 'success']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
        console.log('Authenticated user ID:', req.user.userId);
        const result = await db.query('SELECT username, email, created_at FROM users WHERE id = $1', [req.user.userId]);
        if (result.rows.length === 0) {
            console.error('User not found with ID:', req.user.userId);
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        console.log('User data:', user);

        const ordersResult = await db.query('SELECT * FROM orders WHERE user_id = $1', [req.user.userId]);
        console.log('Orders data:', ordersResult.rows);
        const orders = ordersResult.rows;

        const profileData = {
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            orders: orders.map(order => ({
                id: order.id,
                items: order.items,
                price: order.price,
                created_at: order.created_at,
                status: order.status,
            }))
        };

        console.log('Profile data:', profileData);
        res.json(profileData);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
