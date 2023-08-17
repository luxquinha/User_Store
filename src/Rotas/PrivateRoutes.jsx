import React from "react";
// Responsavel pela navegação das páginas:
import { Navigate } from "react-router-dom";
// Contexto dos logins:
import useLoginContext from "../hooks/useLoginContext";
// Contexto da listagem de produtos:
import CrudContextProvider from "../context/CrudContext";

function PrivateRoutes({children}){
    // Chamando um estado do contexto login:
    const { logged } = useLoginContext()
    // Se o usuários estiver válido ele pode acessar as páginas privadas, se não ele volta para login:
    return logged ? (
        // Somente os usuários válidos têm acesso a esse contexto:
        <CrudContextProvider>
            {children}
        </CrudContextProvider>
        ) : 
        (<Navigate to={'/'}/>)
}

export default PrivateRoutes