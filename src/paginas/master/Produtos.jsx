import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Produtos(){
    const [products, setProducts] = useState([{}])

    const addProduct = (infos)=>{
        if(infos !== undefined){
            const newProduct = [...products,{
                name: infos.name,
                price: Number(infos.price),
                qtd: Number(infos.qtd),
                description: infos.description
            }]
            setProducts(newProduct)
        }
    }
    return(
        <div style={{textAlign: 'center'}}>
            <Link to={'/adicionarProduto'}>
                <button type="button" className="btn btn-outline-info" style={{margin: '10px 10px', textAlign: 'right'}}>+ Adicionar Produto</button>
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pão</td>
                        <td>R$ 4.50</td>
                        <td>10 und.</td>
                        <td>Pão de hamburguer com alpiste</td>
                        <td><Link to={'/editarProduto'}>editar</Link></td>
                        <td><button>excluir</button></td>
                    </tr>
                    {/* Linhas com cada produto e dois botões */}
                </tbody>
            </table>
        </div>
    )
}

export default Produtos