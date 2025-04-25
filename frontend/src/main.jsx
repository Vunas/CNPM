import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import component chính của ứng dụng
import './index.css'; // Import CSS toàn cục

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);