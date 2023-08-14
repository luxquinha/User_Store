import 'bootstrap/dist/css/bootstrap.min.css'
import ProdutoLinha from '../../componentes/ProdutoLinha'
import { Link } from 'react-router-dom'
import useCrudContext from '../../hooks/useCrudContext' 
import { useEffect } from 'react'

function Produtos(){
    const {products, atualizarDados} = useCrudContext()
    useEffect(()=>{
        if(products.length === 0){
            atualizarDados()
        }
    },[])

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
                    {products?.map(product =>(
                        <ProdutoLinha key={product.id} produto={product}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Produtos