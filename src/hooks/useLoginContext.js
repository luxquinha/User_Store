// Importando o contexto para criar um hook:
import { LoginContext } from "../context/LoginContext.js";
// Responsável por chamar o contexto:
import { useContext } from "react";

// Hook para usar o contexto de login:
function useLoginContext(){
    const contextLogin = useContext(LoginContext)

    if(contextLogin === undefined){
        throw new Error('Esta fora de contexto');
    }
    return contextLogin
}

export default useLoginContext