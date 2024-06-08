import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/main/mainPage';
import Profile from './components/profile/profile';
import NotFound from './components/notFound/notFound';
import Register from "./components/register/register"

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}
