// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Hooks para gerenciar os estados da página:
import React, { useState, useEffect } from "react"
// Responsáveis pelas validação do form:
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// Hooks para navegação entre páginas:
import {useParams, useNavigate} from 'react-router-dom'
// Contexto da página:
import useCrudContext from "../../hooks/useCrudContext"
import useLoginContext from '../../hooks/useLoginContext'
// Ícones da página:
import { EditionIcon } from "../../icones/icones"

    // Validação do form feita com a biblioteca 'zod':
    const objectFormSchema = z.object({
        name: z.string(),
        price: z.string(),
        qtd: z.string(),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres'),
        qtdType: z.string()
    })

function EditarProduto(){
    // Chamando variavéis e funções do contexto em que a página está inserida:
    const { products, editProduct } = useCrudContext()
    const { setTitlePage } = useLoginContext()
    // Responsável por setar o produto correto para edição:
    const [product, setProduct] = useState({})
    let { id }= useParams()
    id = Number(id)
    // Hook para navegar após a validação:
    const goTo = useNavigate()
    // Métodos para validação do form:
    const { register, handleSubmit, formState:{errors}} = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(objectFormSchema)
    })
    // Atualiza o produto sempre que mudar o parâmetro id da URL:
    useEffect(()=>{
        setTitlePage('Edit Product')
        setProduct(findEquivalenteProduct())
    },[id])
    // Encontra o produto de acordo com o id vindo da URL e retorna:
    const findEquivalenteProduct = ()=>{
        const Equivalente = products.filter(product => product.id === id)
        return Equivalente[0]
    }
    // Verifica os campos que não foram modificados na aplicação:
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
        // Casos em que a descrição é apagada ou mantida:
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
    // Função que edita o produto e muda a página:
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
                {/* Nome do produto: */}
                <div className="col-md-10">
                    <label htmlFor="inputZip" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="inputZip" 
                    placeholder={`${product?.name}`} 
                    onChange={(event)=>setProduct.name(event.target.value)}
                    {...register('name')} />
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                {/* Preço do produto: */}
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="col-md-4" style={{marginRight: '10px'}}>
                        <label htmlFor="inputState" className="form-label">Unit price:</label>
                        <input type="text" className="form-control" id="inputZip" placeholder={product?.price}
                        {...register('price')}
                        />
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    {/* Quantidade do produto: */}
                    <div className="col-md-3" style={{marginRight: '5px'}}>
                        <label htmlFor="inputState" className="form-label">Quantity:</label>
                        <input type="number" className="form-control" id="inputZip" placeholder={product?.qtd} 
                        {...register('qtd')}
                        />
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                    {/* Qual o tipo da quantidade: */}
                    <div className="input-group" style={{height: '2.2rem', width:'6rem', marginTop:'30px'}}>
                        <select className="form-select" id="inputGroupSelect01" {...register('qtdType')}>
                            <option value={product?.qtdType}>{product?.qtdType}</option>
                            <option value="Kg">Kg</option>
                            <option value="L">L</option>
                            <option value="Und">Und</option>
                        </select>
                    </div>
                </div>
                {/* Descrição do produto: */}
                <div className="col-md-10">
                    <label htmlFor="inputCity" className="form-label">Description:</label>
                    <textarea name="inputCity" className="form-control" id="inputCity" rows="3" {...register('description')} placeholder={product?.description}></textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-success col-md-10">{EditionIcon} Edit Product</button>
            </form>
        </div>
    )
}

export default EditarProduto