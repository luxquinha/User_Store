import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function ProdutoLinha({produto}){
    return (
        <tr style={{textAlign:'center'}}>
            <td>{produto?.name}</td>
            <td>R$ {produto?.price}</td>
            <td>{produto?.qtd} {produto?.qtdType}</td>
            <td>{produto?.description}</td>
            <td><button>Editar</button></td>
            <td><button>Excluir</button></td>
        </tr>
    )
}

export default ProdutoLinha