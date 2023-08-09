import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilos/index.css';
import App from './App';
// Importando elementos da biblioteca router-dom:
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Paginas da aplicação:
import SignIn from './paginas/login/SingIn'
import SignUp from './paginas/login/SignUp.jsx'
import AdicionarProduto from './paginas/master/AdicionarProduto.jsx'
import EditarProduto from './paginas/master/EditarProduto.jsx'
import Produtos from './paginas/master/Produtos.jsx'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <SignIn/>
      },
      {
        path: '/signUp',
        element: <SignUp/>
      },
      {
        path: '/produtos',
        element: <Produtos/>
      },
      {
        path: '/adicionarProduto',
        element: <AdicionarProduto/>
      },
      {
        path: '/editarProduto',
        element: <EditarProduto/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
