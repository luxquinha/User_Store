import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useLoginContext from '../../hooks/useLoginContext.js'

const userFormSchema = z.object({
    email: z.string().nonempty('Campo obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório'),
    confirmPassword: z.string().min(6, 'Tamanho mínimo de 6 caracteres').nonempty('Campo obrigatório')
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmation']
})
function SignUp(){
    const goTo = useNavigate()
    const { createUser } = useLoginContext()
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onSubmit', 
        resolver: zodResolver(userFormSchema),
    })
    const userValidation = (data) =>{
        if(createUser(data)){
            goTo('/')
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
                <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2"
                    {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.confirmPassword.message}</p>)}
                </div>
                {errors.confirmation && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.confirmation.message}</p>)}
                <span style={{marginBottom: '8px'}}>Already have an account? <Link to={'/'}>Sign up</Link> </span>
                
                <button type="submit" className="btn btn-outline-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp