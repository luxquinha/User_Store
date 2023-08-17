// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Hook para atualizar o dados:
import { useEffect } from 'react';
// Hook para navegar pelas páginas:
import { useNavigate, Link } from 'react-router-dom';
// Contexto da página:
import useLoginContext from '../hooks/useLoginContext'
// Ícones da página:
import { LogOutIcon, UserIcon } from '../icones/icones';

function BarraMenu(){
    // Chamando estados para definir qual barra de menu apresentar:
    const {logged, userLogged: user, setLogged: isLogged, setUserLogged: actualUser} = useLoginContext()
    // Navegar entre páginas:
    const goTo = useNavigate()
    // Se houver um usuário ativo ele atualiza o estado:
    useEffect(()=>{
        if(user[0] != null){
            isLogged(true)
        }
    },[])
    // Quando o usuário sair ele atualiza os dados para 'zerar' os estados e volta para login:
    const handleLogOut = ()=>{
        actualUser({})
        isLogged(false)
        goTo('/')
    }

    return(
        // Nome da aplicação:
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#CCC', height: '3.6rem'}}>
            <Link to={(user[0]?.master === true)? '/produtos':'/'} style={{
                marginLeft: '20px',
                textDecoration: 'none',
                color: 'black',
                fontWeight: '600',
                fontSize: '2rem'
            }}>User Store</Link>
            {/* Titulo da página: */}
            {logged ? (
                <h3 style={{marginTop: '10px'}}>Titulo da página</h3>
            ):
            ('')}
            {/* Retorna um menu de acordo com o estado do usuário: */}
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