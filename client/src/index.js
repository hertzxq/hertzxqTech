import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import  "./components/profile/profile.css"
import reportWebVitals from './reportWebVitals';
import App from './App';


const root_id = document.getElementById('root')
const root = ReactDOM.createRoot(root_id);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();