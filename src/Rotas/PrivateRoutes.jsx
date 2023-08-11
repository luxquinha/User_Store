import React from "react";
import { Navigate } from "react-router-dom";
import useLoginContext from "../hooks/useLoginContext";

function PrivateRoutes({children}){
    const { logged } = useLoginContext()

    return logged ? (children) : (<Navigate to={'/'}/>)
}

export default PrivateRoutes