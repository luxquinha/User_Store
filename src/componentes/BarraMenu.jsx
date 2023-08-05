import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function BarraMenu(){
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#CCC'}}>
            <h3>User Store</h3>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page">Cadastar-se</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/editarProduto'} className="nav-link active" aria-current="page">Editar</Link>
                </li>
            </ul>
        </div>
    )
}

export default BarraMenu