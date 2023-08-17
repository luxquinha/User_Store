import 'bootstrap/dist/css/bootstrap.min.css'
import ProdutoLinha from '../../componentes/ProdutoLinha'
import { Link } from 'react-router-dom'
import useCrudContext from '../../hooks/useCrudContext' 
import { useEffect } from 'react'
import { PlusIcon } from "../../icones/icones.js"


function Produtos(){
    const {products, atualizarDados} = useCrudContext()
    useEffect(()=>{
        if(products.length === 0){
            atualizarDados()
        }
    },[])

    return(
        <div >
            <Link to={'/adicionarProduto'}>
                <button type="button" className="btn btn-outline-success" style={{
                margin: '10px 10px', 
                textAlign: 'right',
                lineHeight: '1.8rem',
                fontWeight: '600'
                }}>{PlusIcon} Adicionar Produto</button>
            </Link>
            <table className="table table-striped" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço unitário</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Ações</th>
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