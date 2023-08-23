import React from 'react'
// Paginas da aplicação:
import SignIn from '../paginas/login/SingIn.jsx'
import SignUp from '../paginas/login/SignUp.jsx'
import AdicionarProduto from '../paginas/master/AdicionarProduto.jsx'
import EditarProduto from '../paginas/master/EditarProduto.jsx'
import Produtos from '../paginas/master/Produtos.jsx'
// Importando componentes:
import BarraMenu from '../componentes/BarraMenu.jsx'
import RodaPe from '../componentes/RodaPe.jsx'
// Elementos responsáveis pelas rotas:
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Rotas privadas da aplicação:
import PrivateRoutes from './PrivateRoutes.jsx'

function MainRoutes(){
    return(
        <BrowserRouter>
          <BarraMenu/>
          <div className="conteudo" style={{width: '100vw', height: '84vh'}}>
            {/* // Rotas de toda a aplicação: */}
            <Routes>
                {/* Rotas públicas: */}
                <Route path='/' element={<SignIn/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                {/* Rotas privadas: */}
                <Route path='/produtos' element={
                <PrivateRoutes>
                    <Produtos/>
                </PrivateRoutes>
                }/>
                <Route path='/adicionarProduto' element={
                <PrivateRoutes>
                    <AdicionarProduto/>
                </PrivateRoutes>
                }/>
                <Route path='/editarProduto/:id' element={
                <PrivateRoutes>
                    <EditarProduto/>
                </PrivateRoutes>
                }/>
                <Route path='*' element={<SignIn/>}/>
            </Routes>
          </div>
          <RodaPe/>
        </BrowserRouter>
    )
}

export default MainRoutes