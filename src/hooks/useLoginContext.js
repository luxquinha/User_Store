import { LoginContext } from "../context/LoginContext.js";
import { useContext } from "react";

function useLoginContext(){
    const contextLogin = useContext(LoginContext)

    if(contextLogin === undefined){
        throw new Error('Esta fora de contexto');
    }

    return contextLogin
}

export default useLoginContext