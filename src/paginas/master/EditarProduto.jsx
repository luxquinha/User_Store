import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useCrudContext from "../../hooks/useCrudContext"
import {useParams, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

    const objectFormSchema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        price: z.string().nonempty('Informe o valor do produto').regex(/([0-9]{1,}.?)/g, 'Tipo inválido'),
        qtd: z.string().nonempty('Informe a quantidade do produto').regex(/[0-9]/g, 'Tipo inválido'),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres')
    })

function EditarProduto(){
    const { products } = useCrudContext()
    const [product, setProduct] = useState({})
    const goTo = useNavigate()
    let { id }= useParams()
    id = Number(id)
    const { register, handleSubmit, formState:{errors}} = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(objectFormSchema)
    })
    const editedProduct = (data)=>{
        console.log(data);
        // goTo('/produtos')
    }
    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <form className="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column', textAlign: 'left'}}
            onSubmit={handleSubmit(editedProduct)}
            >
                <div className="col-md-10">
                    <label for="inputZip" className="form-label">Nome:</label>
                    <input type="text" className="form-control" id="inputZip" placeholder={`${products[id]?.name}`} {...register('name')} />
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="col-md-4" style={{marginRight: '10px'}}>
                        <label htmlFor="inputState" className="form-label">Preço:</label>
                        <input type="text" className="form-control" id="inputZip" placeholder={products[id]?.price}
                        {...register('price')}
                        />
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    <div className="col-md-3" style={{marginRight: '5px'}}>
                        <label htmlFor="inputState" className="form-label">Quantidade:</label>
                        <input type="number" className="form-control" id="inputZip" placeholder={products[id]?.qtd} 
                        {...register('qtd')}
                        />
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                    <div className="input-group" style={{height: '2.2rem', width:'6rem', marginTop:'30px'}}>
                        <select className="form-select" id="inputGroupSelect01" {...register('qtdType')} placeholder={products[id]?.qtdType}>
                            <option>-Type-</option>
                            <option value="Kg">Kg</option>
                            <option value="L">L</option>
                            <option value="Und">UND</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-10">
                    <label for="inputCity" className="form-label">Descrição:</label>
                    <textarea name="inputCity" className="form-control" id="inputCity" rows="3" {...register('description')} placeholder={products[id]?.description}></textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-primary col-md-10">Salvar Produto</button>
            </form>
        </div>
    )
}

export default EditarProduto