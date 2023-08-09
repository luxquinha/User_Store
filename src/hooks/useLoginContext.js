import { loginContext } from "../context/loginContext";
import { useContext } from "react";

function useLoginContext(){
    const contextLogin = useContext(loginContext)

    if(contextLogin === undefined){
        throw new Error('Esta fora de contexto');
    }

    return contextLogin
}

export default useLoginContext