import React from "react";
import { Navigate } from "react-router-dom";
import useLoginContext from "../hooks/useLoginContext";
import CrudContextProvider from "../context/CrudContext";

function PrivateRoutes({children}){
    const { logged } = useLoginContext()

    return logged ? (
        <CrudContextProvider>
            {children}
        </CrudContextProvider>
        ) : 
        (<Navigate to={'/'}/>)
}

export default PrivateRoutes