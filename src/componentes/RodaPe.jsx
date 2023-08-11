import useLoginContext from "../hooks/useLoginContext"

function RodaPe(){
    const { logged, timeLogIn } = useLoginContext()
    return(
        <div style={{backgroundColor: '#CCC', textAlign: 'center', borderBottom: '0px'}}>
            {logged ? (<span>Usuário acessou às {timeLogIn}</span>) : (<span>Seja bem-vindo à User Store</span>)}
        </div>
    )
}

export default RodaPe