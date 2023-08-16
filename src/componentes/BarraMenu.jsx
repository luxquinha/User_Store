import 'bootstrap/dist/css/bootstrap.min.css'
import useLoginContext from '../hooks/useLoginContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LogOutIcon, UserIcon } from '../icones/icones';

function BarraMenu(){
    const {logged, userLogged: user, setLogged: isLogged, setUserLogged: actualUser} = useLoginContext()
    const goTo = useNavigate()
    useEffect(()=>{
        if(user[0] != null){
            isLogged(true)
        }
    },[])
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
                    <li style={{display: 'inline', marginRight: '20px', color: 'black'}}>{UserIcon} {user[0]?.name}</li>
                    <button onClick={handleLogOut} style={{
                        marginRight: '20px',
                        marginTop: '5px',
                        outline: 'none',
                        border: 'none',
                        color: 'white',
                        backgroundColor: 'transparent',
                        fontWeight: '600'
                        }}>Log out {LogOutIcon}</button>
                </div>):
                ('')
                }
            </ul>
        </div>
    )
}

export default BarraMenu