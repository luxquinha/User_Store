import 'bootstrap/dist/css/bootstrap.min.css'
import useLoginContext from '../hooks/useLoginContext'
import { useNavigate, Link } from 'react-router-dom';
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
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#CCC', height: '3.6rem'}}>
            <Link to={(user[0].master === true)? '/produtos':'/'} style={{
                marginLeft: '20px',
                textDecoration: 'none',
                color: 'black',
                fontWeight: '600',
                fontSize: '2rem'
            }}>User Store</Link>
            <h3 style={{marginTop: '10px'}}>Titulo da página</h3>
            <ul className="nav justify-content-end">
                {logged ?
                (<div style={{display: 'flex', flexDirection: 'row'}}>
                    <li style={{display: 'inline', marginRight: '20px', color: 'black', marginTop: '16px'}}>{UserIcon} {user[0]?.name}</li>
                    <button onClick={handleLogOut} style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '0.9rem',
                        marginRight: '20px',
                        marginTop: '-30px'
                    }}
                    >Log out {LogOutIcon}</button>
                </div>):
                ('')
                }
            </ul>
        </div>
    )
}

export default BarraMenu