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
import PrivateRoutes from './PrivateRoutes.jsx'

function MainRoutes(){
    return(
        <BrowserRouter>
          <BarraMenu/>
          <div className="conteudo" style={{width: '100vw', height: '87.9vh'}}>
            <Routes>
                <Route path='/' element={<SignIn/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
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
                <Route path='/editarProduto' element={
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