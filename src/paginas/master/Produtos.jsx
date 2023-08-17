// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Hook que atualiza os dados após carregar a página:
import { useEffect } from 'react'
// Componente para interligar paginas:
import { Link } from 'react-router-dom'
// Contexto para gerenciar os produtos:
import useCrudContext from '../../hooks/useCrudContext' 
// Componentes:
import ProdutoLinha from '../../componentes/ProdutoLinha'
// Ícones da página:
import { PlusIcon } from "../../icones/icones.js"


function Produtos(){
    // Chamando estados e funções do contexto em que a página está inserida:
    const {products, atualizarDados} = useCrudContext()
    // Se a página for atualizada ele mantém os dados da aplicação atualizado:
    useEffect(()=>{
        if(products.length === 0){
            atualizarDados()
        }
    },[])

    return(
        <div >
            {/* Botão para ir para o formulário de cadastro de produtos: */}
            <Link to={'/adicionarProduto'}>
                <button type="button" className="btn btn-outline-success" style={{
                margin: '10px 10px', 
                textAlign: 'right',
                lineHeight: '1.8rem',
                fontWeight: '600'
                }}>{PlusIcon} Adicionar Produto</button>
            </Link>
            {/* Tabela de produtos: */}
            <table className="table table-striped" style={{textAlign: 'center'}}>
                {/* Cabeçalhos da tabela: */}
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço unitário</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                {/* Corpo da tabela de acordo com os valores inseridos em 'products' */}
                <tbody>
                    {products?.map(product =>(
                        <ProdutoLinha key={product.id} produto={product}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Produtos