import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function Produtos(){
    return(
        <div style={{textAlign: 'center'}}>
            <Link to={'/adicionarProduto'}>
                <button type="button" class="btn btn-outline-info" style={{margin: '10px 10px', textAlign: 'right'}}>+ Adicionar Produto</button>
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
                    
                </tbody>
            </table>
        </div>
    )
}

export default Produtos