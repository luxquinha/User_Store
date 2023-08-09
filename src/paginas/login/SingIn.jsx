import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userFormSchema = z.object({
    email: z.string().nonempty('Campo obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório')
})
function SignIn(){
    const [thereIs, setThereIs] = useState()
    const goTo = useNavigate()
    const [users, setUsers] = useState([{
        name: '@lucasr',
        email: 'lucasr@luc.com.br',
        password: '123456',
        master: true
    }])
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onSubmit', 
        resolver: zodResolver(userFormSchema),
    })
    const hasUser = (email)=>{
        const user = users.filter(user =>
            user.email === email
        )
        return user
    }
    const passwordMatch= (passwordReceived, passwordUser)=>{
        return (passwordReceived === passwordUser) ? true : false
    }
    const userValidation = (data) =>{
        let actualUser = hasUser(data.email)
        console.log(actualUser);
        if(actualUser !== null){
            let match = passwordMatch(data.password, actualUser[0]?.password)
            console.log(match);
            if(match){
                alert(`Wellcome ${actualUser[0].name}`)
                goTo('/produtos')
            }
            else{
                setThereIs('Usuário ou Senha inválidos')
            }
        }else{
            setThereIs('Usuário ou Senha inválidos')
        }
    }
    return(
        <div style={{height: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <form style={{width: '30rem', height: '20rem', display:'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center'}}
            onSubmit={handleSubmit(userValidation)} >
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    {...register('email')}
                    />
                    {errors.email && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.email.message}</p>)}
                </div>
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    {...register('password')}
                    />
                    {errors.password && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.password.message}</p>)}
                </div>
                {thereIs && (<p style={{fontSize: '0.8rem', color: 'red'}}>{thereIs}</p>)}
                <span style={{marginBottom: '8px'}}>Have an account? <Link to={'/signUp'}>Sign up</Link> </span>
                
                <button type="submit" className="btn btn-outline-primary">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn