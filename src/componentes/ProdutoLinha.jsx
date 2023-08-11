import React from "react";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProdutoLinha({produto}){
    return (
        <tr style={{textAlign:'center'}}>
            <td>{produto?.name}</td>
            <td>R$ {produto?.price}</td>
            <td>{produto?.qtd} {produto?.qtdType}</td>
            <td>{produto?.description}</td>
            <td><Link to={`/editarProduto/${produto?.id}`}>Editar</Link></td>
            <td><button>Excluir</button></td>
        </tr>
    )
}

export default ProdutoLinha