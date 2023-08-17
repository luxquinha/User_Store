import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilos/index.css';
import App from './App';
// Importando o provider para o contexto geral da aplicação:
import { LoginProvider } from './context/LoginContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Todo o App tem acesso a esse contexto: */}
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
