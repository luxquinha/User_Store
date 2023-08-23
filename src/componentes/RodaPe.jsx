// Contexto do componente:
import useLoginContext from "../hooks/useLoginContext"

function RodaPe(){
    // Chamando estados e funções do contexto:
    const { logged, timeLogIn, dataLogin } = useLoginContext()
    // Retorna o conteúdo do rodapé de acordo com o estado do usuário:
    return(
        <div style={{backgroundColor: '#CCC', textAlign: 'center', borderBottom: '0px', minHeight:'2.7rem'}}>
            {logged ? 
            (<div style={{display:'flex', flexDirection:'column', textAlign:'center'}}> 
                <span>User acess at {timeLogIn}</span>
                <span style={{fontSize:'0.8rem'}}>{dataLogin}</span>
            </div>)
            : 
            (<span style={{fontSize:'1.2rem'}}>Wellcome to User Store</span>)}
        </div>
    )
}

export default RodaPe