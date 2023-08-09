import 'bootstrap/dist/css/bootstrap.min.css'
import useLoginContext from '../hooks/useLoginContext'
import { useNavigate } from 'react-router-dom';

function BarraMenu(){
    const {logged, userLogged: user, setLogged: isLogged, setUserLogged: actualUser} = useLoginContext()
    const goTo = useNavigate()
    console.log(user);
    const handleLogOut = ()=>{
        actualUser({})
        isLogged(false)
        goTo('/')
    }
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#CCC'}}>
            <h3>User Store</h3>
            <ul className="nav justify-content-end">
                {logged ?
                (<div>
                    <li style={{display: 'inline', marginRight: '10px'}}>{user[0].name}</li>
                    <button onClick={handleLogOut}>Log out</button>
                </div>):
                ('')
                }
            </ul>
        </div>
    )
}

export default BarraMenu