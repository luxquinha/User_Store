import {createContext, useState} from "react";

export const loginContext = createContext(null)

export const loginProvider = ({children})=>{
    const [logged, setLogged] = useState(false)
    const [createId, setCreateId] = useState(0)
    const [users, setUsers] = useState([{
        id: createId,
        name: '@lucasr',
        email: 'lucasr@luc.com.br',
        password: '123456',
        master: true
    }])

    return(
        <loginContext value={users}>
            {children}
        </loginContext>
    )
}