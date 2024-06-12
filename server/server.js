require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require("./db");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
        console.log(`Stored Hashed Password: ${user.password}`);
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(`Password is valid: ${validPassword}`);
        if (!validPassword) {
            console.error('Invalid password for username:', username);
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated token:', token);
        res.json({ token });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: err.message });
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
                product: order.product,
                price: order.price,
                date: order.date
            }))
        };

        console.log('Profile data:', profileData);
        res.json(profileData);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});