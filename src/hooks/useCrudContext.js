import { CrudContext } from "../context/CrudContext.js";
import { useContext } from "react";

function useCrudContext(){
    const crudContext = useContext(CrudContext)

    if(crudContext === undefined){
        throw new Error('Está fora do contexto CRUD')
    }
    return crudContext
}

export default useCrudContext