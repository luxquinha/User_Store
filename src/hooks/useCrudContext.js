// Importando o contexto para criar um hook:
import { CrudContext } from "../context/CrudContext.js";
// Responsável por chamar o contexto:
import { useContext } from "react";

// Hook para usar o contexto de CRUD's:
function useCrudContext(){
    const crudContext = useContext(CrudContext)

    if(crudContext === undefined){
        throw new Error('Está fora do contexto CRUD')
    }
    return crudContext
}

export default useCrudContext