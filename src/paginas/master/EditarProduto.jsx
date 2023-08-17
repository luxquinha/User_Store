import React, { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useCrudContext from "../../hooks/useCrudContext"
import {useParams, useNavigate} from 'react-router-dom'
import { EditionIcon } from "../../icones/icones"
import 'bootstrap/dist/css/bootstrap.min.css'

    const objectFormSchema = z.object({
        name: z.string(),
        price: z.string(),
        qtd: z.string(),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres'),
        qtdType: z.string()
    })

function EditarProduto(){
    const { products, editProduct } = useCrudContext()
    const [product, setProduct] = useState({})
    const goTo = useNavigate()
    let { id }= useParams()
    id = Number(id)
    const { register, handleSubmit, formState:{errors}} = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(objectFormSchema)
    })
    useEffect(()=>{
        setProduct(findEquivalenteProduct())
    },[id])

    const findEquivalenteProduct = ()=>{
        const Equivalente = products.filter(product => product.id === id)
        return Equivalente[0]
    }

    const nonChanges = (data)=>{
        if(data.name === ''){
            data.name = product.name
        }
        if(data.price === ''){
            data.price = product.price
        }
        if(data.qtd === ''){
            data.qtd = Number(product.qtd)
        }
        if(data.qtdType === ''){
            data.qtdType = product.qtdType
        }
        if(data.description === '' && product.description === ''){
            data.description = ''
        }else if(data.description !== '' && product.description === ''){
            data.description = data.description
        }else if(product.description !== '' && data.description === ''){
            if(window.confirm('Deseja manter o produto com a mesma descrição?')){
                data.description = product.description
            }else{
                data.description = data.description
            }
        }

        return data
    }
    const editedProduct = (data)=>{
        const dataModified = nonChanges(data)
        editProduct(dataModified, id)
        goTo('/produtos')
    }
    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <form className="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column', textAlign: 'left'}}
            onSubmit={handleSubmit(editedProduct)}
            >
                <div className="col-md-10">
                    <label htmlFor="inputZip" className="form-label">Nome:</label>
                    <input type="text" className="form-control" id="inputZip" 
                    placeholder={`${product?.name}`} 
                    onChange={(event)=>setProduct.name(event.target.value)}
                    {...register('name')} />
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="col-md-4" style={{marginRight: '10px'}}>
                        <label htmlFor="inputState" className="form-label">Preço unitário:</label>
                        <input type="text" className="form-control" id="inputZip" placeholder={product?.price}
                        {...register('price')}
                        />
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    <div className="col-md-3" style={{marginRight: '5px'}}>
                        <label htmlFor="inputState" className="form-label">Quantidade:</label>
                        <input type="number" className="form-control" id="inputZip" placeholder={product?.qtd} 
                        {...register('qtd')}
                        />
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                    <div className="input-group" style={{height: '2.2rem', width:'6rem', marginTop:'30px'}}>
                        <select className="form-select" id="inputGroupSelect01" {...register('qtdType')}>
                            <option value={product?.qtdType}>{product?.qtdType}</option>
                            <option value="Kg">Kg</option>
                            <option value="L">L</option>
                            <option value="Und">Und</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-10">
                    <label htmlFor="inputCity" className="form-label">Descrição:</label>
                    <textarea name="inputCity" className="form-control" id="inputCity" rows="3" {...register('description')} placeholder={product?.description}></textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-success col-md-10">{EditionIcon} Editar Produto</button>
            </form>
        </div>
    )
}

export default EditarProduto