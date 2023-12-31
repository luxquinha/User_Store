// Biblioteca para estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Gerenciador de estados:
import { useState } from 'react'
// Navegação das páginas:
import { useNavigate, Link } from 'react-router-dom'
// Bibliotecas responsáveis pela validação de formulários:
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// Contexto no qual a aplicação está inserida:
import useLoginContext from '../../hooks/useLoginContext.js'
// Icones usados na tela:
import {GmailIcon, PasswordIcon} from '../../icones/icones.js'

// Fazendo as validações com zod:
const userFormSchema = z.object({
    email: z.string().nonempty('Campo obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório')
})

function SignIn(){
    // Seta um erro e imprime na tela caso o usuário ou senha estejam errados:
    const [invalid, setInvalid] = useState()
    // Navegar para outra página se uma condição for aceita:
    const goTo = useNavigate()
    // Função do contexto geral de login:
    const {isValid}  = useLoginContext()
    // Chamando alguns metódos para fazer as validações dos formulários:
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        mode: 'onSubmit', 
        resolver: zodResolver(userFormSchema),
    })
    // Função para verificar se o usuário é válido:
    const userValidation = (data) =>{
        if(isValid(data)){
            goTo('/produtos')
        }else{
            setInvalid('E-mail ou senha inválidos')
        }
    }

    return(
        <div style={{height: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <form style={{
                width: '30rem', 
                height: '20rem', 
                display:'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'left'
            }}
            onSubmit={handleSubmit(userValidation)} >
                {/* Email: */}
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{fontWeight: '500'}}>{GmailIcon} Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    {...register('email')}
                    placeholder='usuario@luc.com.br'
                    autoComplete='off'
                    />
                    {errors.email && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.email.message}</p>)}
                </div>
                {/* Senha: */}
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{fontWeight: '500'}}>{PasswordIcon} Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    {...register('password')}
                    placeholder='Enter your password'
                    />
                    {errors.password && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.password.message}</p>)}
                </div>
                {/* Se o usuário for inválido: */}
                {invalid && (<p style={{fontSize: '0.8rem', color: 'red'}}>{invalid}</p>)}
                {/* Link que interliga as telas Sign In e Sign Up */}
                <span style={{marginBottom: '8px'}}>Have an account? <Link to={'/signUp'}>Sign up</Link> </span>
                <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>{isSubmitting? 'Sign in...':'Sign in'}</button>
            </form>
        </div>
    )
}

export default SignIn