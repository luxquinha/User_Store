// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Metódos resposáveis pela validação dos formulários:
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// Responsável pelas rotas da aplicação:
import { useNavigate, Link } from 'react-router-dom'
// Contexto em que a tela está inserida:
import useLoginContext from '../../hooks/useLoginContext.js'
// Ícones usados na tela:
import { GmailIcon, PasswordIcon, PlusUserIcon } from '../../icones/icones.js'

// Fazendo as validações com zod:
const userFormSchema = z.object({
    email: z.string().nonempty('Campo obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório'),
    confirmPassword: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório')
    // Verifica se as senhas são equivalentes:
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmation']
})

function SignUp(){
    // Navegar pelas páginas após a validação do form:
    const goTo = useNavigate()
    // Chamando a função do contexto para adicionar usuários:
    const { createUser } = useLoginContext()
    // Métodos para validação dos forms:
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onSubmit', 
        resolver: zodResolver(userFormSchema),
    })
    // Função que adiciona um usuário não existente na aplicação:
    const userValidation = (data) =>{
        if(createUser(data)){
            goTo('/')
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
                {/* Confirmar senha: */}
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{fontWeight: '500'}}>{PasswordIcon} Confirm password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2"
                    {...register('confirmPassword')}
                    placeholder='Confirm your password'
                    />
                    {errors.confirmPassword && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.confirmPassword.message}</p>)}
                </div>
                {/* Caso as senhas não sejam iguais: */}
                {errors.confirmation && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.confirmation.message}</p>)}
                {/* Link que interliga as telas Sign In e Sign Up */}
                <span style={{marginBottom: '8px'}}>Already have an account? <Link to={'/'}>Sign up</Link> </span>
                <button type="submit" className="btn btn-outline-primary">{PlusUserIcon} Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp