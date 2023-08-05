import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function Login(){
    return(
        <div style={{height: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <form style={{width: '30rem', height: '20rem', display:'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center'}}>
                <div className="mb-3 col-md-6">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3 col-md-6">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" required/>
                </div>
                <Link to={'/produtos'}>
                    <button type="submit" className="btn btn-outline-primary">Entrar</button>
                </Link>
            </form>
        </div>
    )
}

export default Login