import React from 'react';
// Css da página:
import './estilos/App.css';
// Rotas da aplicação:
import MainRoutes from './Rotas/MainRoutes';

function App() {
  return (
    <div className="App">
      {/* Mostra o conteúdo de acordo com a rota: */}
      <MainRoutes/>
    </div>
  );
}

export default App;
