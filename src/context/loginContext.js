import {createContext, useEffect, useState} from "react";

export const LoginContext = createContext(null)

export const LoginProvider = ({children})=>{
    const [logged, setLogged] = useState(false)
    const [createId, setCreateId] = useState(1)
    const [timeLogIn, setTimeLogIn] = useState()
    const [userLogged, setUserLogged] = useState({})
    const [users, setUsers] = useState([{
        id: 0,
        name: '@lucasr',
        email: 'lucasr@luc.com.br',
        password: '123456',
        master: true
    }])
    let usuariosCadastradosKey = 'usuarios' 
    useEffect(()=>{
        if(users.length>=2){
            localStorage.setItem(usuariosCadastradosKey, JSON.stringify(users))
        }else{
            atualizarDados()
        }
    },[users])
    
    const atualizarDados = ()=>{
        if(users.length === 1 && localStorage.getItem(usuariosCadastradosKey) === null){
            localStorage.setItem(usuariosCadastradosKey, JSON.stringify(users))
        }
        const conteudo = JSON.parse(localStorage.getItem(usuariosCadastradosKey) || '[]')
        const idAtual = Number(conteudo[conteudo.length-1]?.id)
        if(!isNaN(idAtual)){
            setCreateId(idAtual+1)
        }
        setUsers(conteudo)
    }
    const hasUser = (email)=>{
        const user = users.filter(user =>
            user.email === email
        )
        return user
    }
    const passwordMatch= (passwordReceived, passwordUser)=>{
        return (passwordReceived === passwordUser) ? true : false
    }
    const isValid = (data)=>{
        atualizarDados()
        let actualUser = hasUser(data.email)
        if(actualUser !== null){
            let match = passwordMatch(data.password, actualUser[0]?.password)
            if(match){
                let timeOfLog = new Date().toLocaleTimeString()
                setLogged(true)
                setUserLogged(actualUser)
                setTimeLogIn(timeOfLog)
                return true
            }
            else{
                return false
            }
        }else{
            return false
        }
    }
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
    const createUser = (data)=>{
        atualizarDados()
        let actualUser = hasUser(data.email)
        if(actualUser.length === 0){
            const newUser = [...users,{
                id: createId,
                name: userNameCreator(data.email),
                email: data.email,
                password: data.password,
                master: false
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
        <LoginContext.Provider value={{isValid, setLogged, logged, userLogged, setUserLogged, timeLogIn, createUser}}>
            {children}
        </LoginContext.Provider>
    )
}