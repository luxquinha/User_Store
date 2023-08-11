import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilos/index.css';
import App from './App';
// Importando elementos da biblioteca router-dom:
import { LoginProvider } from './context/loginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
