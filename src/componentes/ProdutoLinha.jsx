import React from "react";
import {Link} from 'react-router-dom'
import { TrashIcon, EditionIcon } from "../icones/icones";
import 'bootstrap/dist/css/bootstrap.min.css'
import useCrudContext from "../hooks/useCrudContext";

function ProdutoLinha({produto}){
    const { clearItem } = useCrudContext()
    const excluirItem =()=>{
        clearItem(produto?.id)
    }
    return (
        <tr style={{textAlign:'center'}}>
            <td>{produto?.name}</td>
            <td>R$ {produto?.price.toFixed(2)}</td>
            <td>{produto?.qtd} {produto?.qtdType}</td>
            <td>{produto?.description}</td>
            <td>
                <Link to={`/editarProduto/${produto?.id}`}>
                    <button type="button" className="btn btn-outline-secondary">{EditionIcon} Editar</button>
                </Link>
                <button type="button" className="btn btn-outline-danger" style={{marginLeft: '8px'}} onClick={excluirItem}>{TrashIcon} Excluir</button>
            </td>
        </tr>
    )
}

export default ProdutoLinha