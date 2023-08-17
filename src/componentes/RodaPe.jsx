// Contexto do componente:
import useLoginContext from "../hooks/useLoginContext"

function RodaPe(){
    // Chamando estados e funções do contexto:
    const { logged, timeLogIn } = useLoginContext()
    // Retorna o conteúdo do rodapé de acordo com o estado do usuário:
    return(
        <div style={{backgroundColor: '#CCC', textAlign: 'center', borderBottom: '0px'}}>
            {logged ? (<span>Usuário acessou às {timeLogIn}</span>) : (<span>Seja bem-vindo à User Store</span>)}
        </div>
    )
}

export default RodaPe