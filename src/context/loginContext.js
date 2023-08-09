import {createContext, useState} from "react";

export const LoginContext = createContext(null)

export const LoginProvider = ({children})=>{
    const [logged, setLogged] = useState(false)
    const [createId, setCreateId] = useState(0)
    const [userLogged, setUserLogged] = useState({})
    const [users, setUsers] = useState([{
        id: createId,
        name: '@lucasr',
        email: 'lucasr@luc.com.br',
        password: '123456',
        master: true
    }])
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
        let actualUser = hasUser(data.email)
        if(actualUser !== null){
            let match = passwordMatch(data.password, actualUser[0]?.password)
            if(match){
                setLogged(true)
                setUserLogged(actualUser)
                return true
            }
            else{
                return false
            }
        }else{
            return false
        }
    }
    return(
        <LoginContext.Provider value={{isValid, setLogged, logged, userLogged, setUserLogged}}>
            {children}
        </LoginContext.Provider>
    )
}