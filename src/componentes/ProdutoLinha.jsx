import React from "react";
// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Responsável por navegar nas páginas:
import {Link} from 'react-router-dom'
// Contexto do componente:
import useCrudContext from "../hooks/useCrudContext";
// Ícones do componente:
import { TrashIcon, EditionIcon } from "../icones/icones";

// Componente que recebe um produto como props:
function ProdutoLinha({produto}){
    // Chamando função que exclui item da lista:
    const { clearItem } = useCrudContext()
    // Função que envia o id do produto a ser excluido:
    const excluirItem =()=>{
        clearItem(produto?.id)
    }

    return (
        // Preenche as colunas de acordo com os dados recebidos:
        <tr style={{textAlign:'center'}}>
            <td>{produto?.name}</td>
            <td>R$ {produto?.price.toFixed(2)}</td>
            <td>{produto?.qtd} {produto?.qtdType}</td>
            <td>{produto?.description}</td>
            <td>
                {/* Função que leva o usuário para página de edição: */}
                <Link to={`/editarProduto/${produto?.id}`}>
                    <button type="button" className="btn btn-outline-secondary">{EditionIcon} Editar</button>
                </Link>
                {/* Função que exclui o item da lista: */}
                <button type="button" className="btn btn-outline-danger" style={{marginLeft: '8px'}} onClick={excluirItem}>{TrashIcon} Excluir</button>
            </td>
        </tr>
    )
}

export default ProdutoLinha