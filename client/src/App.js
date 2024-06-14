import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/main/mainPage';
import Profile from './components/profile/profile';
import NotFound from './components/notFound/notFound';
import Register from "./components/register/register"
import Login from './components/login/login';
import ProductCard from './components/productCard/productCard';
import PrivateRoute from './components/login/PrivateRoute';
import Bin from './components/bin/bin';

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductCard />} />
        <Route path="/bin" element={<Bin />} />
      </Routes>
    </Router>
    </>
  );
}
