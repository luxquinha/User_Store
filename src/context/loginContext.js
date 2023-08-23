// Hook para gerenciamento e criação de um contexto:
import {createContext, useEffect, useState} from "react";
// Criando um contexto:
export const LoginContext = createContext(null)
// Criando um provider do contexto que recebe um children:
export const LoginProvider = ({children})=>{
    // Chave para povoar o localStorage:
    const usuariosCadastradosKey = 'usuarios' 
    // Estados do contexto:
    const [titlePage, setTitlePage] = useState('')
    const [logged, setLogged] = useState(false)
    const [createId, setCreateId] = useState(1)
    const [timeLogIn, setTimeLogIn] = useState()
    const [dataLogin, setDataLogin] = useState()
    const [userLogged, setUserLogged] = useState({})
    const [users, setUsers] = useState([{
        id: 0,
        name: '@lucasr',
        email: 'lucasr@luc.com.br',
        password: '123456',
        master: true
    }])
    // Atualiza o localStorage sempre que mudar o estado users:
    useEffect(()=>{
        // Evita de perder os dados do localStorage quando atualizar a tela:
        if(users.length>=2){
            localStorage.setItem(usuariosCadastradosKey, JSON.stringify(users))
        }else if(users.length === 1 && localStorage.getItem(usuariosCadastradosKey) === null){
            localStorage.setItem(usuariosCadastradosKey, JSON.stringify(users))
        }
    },[users])
    // Função que atualiza os dados da aplicação de acordo com os dados do localStorage:
    const atualizarDados = ()=>{
        const conteudo = JSON.parse(localStorage.getItem(usuariosCadastradosKey) || '[]')
        // Verifica o Id para não gerar id iguais em caso de atulizar a tela:
        const idAtual = Number(conteudo[conteudo.length-1]?.id)
        if(!isNaN(idAtual)){
            setCreateId(idAtual+1)
        }
        setUsers(conteudo)
    }
    // Verifica se há um usuário com o email recebido e retorna:
    const hasUser = (email)=>{
        const user = users.filter(user =>
            user.email === email
        )
        return user
    }
    // Verifica se as senha recebida e a senha do usuário são idênticas e retorna um valor boleano:
    const passwordMatch= (passwordReceived, passwordUser)=>{
        return (passwordReceived === passwordUser) ? true : false
    }
    // Verifica se é um usuário válido para acessar as páginas privadas:
    const isValid = (data)=>{
        atualizarDados()
        let actualUser = hasUser(data.email)
        if(actualUser !== null){
            let match = passwordMatch(data.password, actualUser[0]?.password)
            // Se for válido, ele atualiza os estados para confirmar a veracidade dos dados e retorna true:
            if(match){
                let dataInfo = new Date()
                setLogged(true)
                setUserLogged(actualUser)
                setTimeLogIn(dataInfo.toLocaleTimeString())
                setDataLogin(dataInfo.toLocaleDateString())
                return true
            }
            else{
                return false
            }
        }else{
            return false
        }
    }
    // Gera um nome de usuário de acordo com o email recebido:
    const userNameCreator=(email)=>{
        let userName = ''
        for(let i=0; i<email.length; i++){
            if(email[i] !== '@'){
                userName += email[i]
            }else{
                break
            }
        }
        return `@${userName}`
    }
    // Função que cria um novo usuário:
    const createUser = (data)=>{
        atualizarDados()
        // Verifica se já existe um usuário com o email recebido:
        let actualUser = hasUser(data.email)
        // Se não houver um usuário com mesmo email, ela cria um usuário e atualiza o estado users:
        if(actualUser.length === 0){
            const newUser = [...users,{
                id: createId,
                name: userNameCreator(data.email),
                email: data.email,
                password: data.password,
                master: true
            }]
            setUsers(newUser)
            alert('Usuário cadastrado com sucesso!')
            return true
        }else{
            alert('Usuário já existente!')
            return false
        }
    }

    return(
        // Envolve o children com o contexto e envia estados e funções para a aplicação:
        <LoginContext.Provider value={{isValid, setLogged, logged, userLogged, setUserLogged, timeLogIn, dataLogin, createUser, titlePage, setTitlePage}}>
            {children}
        </LoginContext.Provider>
    )
}