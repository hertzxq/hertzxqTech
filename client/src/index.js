import React from 'react';
import ReactDOM from 'react-dom/client';
import "./components/notFound/notFound.css"
import './index.css';
import  "./components/profile/profile.css"
import reportWebVitals from './reportWebVitals';
import App from './App';
import "./components/register/register.css"
import "./components/register/register.css"
import "./components/productCard/productCard.css"

const root_id = document.getElementById('root')
const root = ReactDOM.createRoot(root_id);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
