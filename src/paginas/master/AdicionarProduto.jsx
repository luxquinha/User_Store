// Biblioteca de estilização:
import 'bootstrap/dist/css/bootstrap.min.css'
// Hook para atualizar os dados ao renderizar a página:
import React, {useEffect} from 'react'
// Responsáveis pela validação do form:
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// Hook para navegação entre páginas:
import { useNavigate } from 'react-router-dom'
// Contexto da página:
import useCrudContext from '../../hooks/useCrudContext.js'
import useLoginContext from '../../hooks/useLoginContext.js'

    // Fazendo a validação do from com a biblioteca 'zod':
    const objectFormSchema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        price: z.string().nonempty('Informe o valor do produto').regex(/([0-9]{1,}.?)/g, 'Tipo inválido'),
        qtd: z.string().nonempty('Informe a quantidade do produto').regex(/[0-9]/g, 'Tipo inválido'),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres'),
        qtdType: z.string().nonempty('Select a type')
    })

function AdicionarProduto(){
    // Hook para navegação:
    const goTo = useNavigate()
    // Chamando uma função do contexto em que a página está inserida:
    const { addProduct } = useCrudContext()
    const { setTitlePage } = useLoginContext()
    // Métodos e estados para as entradas do form:
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver(objectFormSchema),
        mode: 'onSubmit'
    })
    // Quando a página renderizar o título da página será atualizado:
    useEffect(()=>{
        setTitlePage('Products Registration')
    },[])
    // Função que adiciona o produto e muda de página:
    const createProduct = (data)=>{
        addProduct(data)
        goTo('/produtos')
    }

    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <form className="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column', textAlign:'left'}}
            onSubmit={handleSubmit(createProduct)}
            >
                {/* Nome do produto: */}
                <div className="col-md-10">
                    <label htmlFor="inputZip" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="inputZip" placeholder="Nome do produto" 
                    {...register('name')}
                    />
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                {/* Preço do produto: */}
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="col-md-4" style={{marginRight: '10px'}}>
                        <label htmlFor="inputState" className="form-label">Unit price:</label>
                        <input type="text" className="form-control" id="inputZip" placeholder="R$ 00.00" 
                        {...register('price')}
                        />
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    {/* Quantidade do produto: */}
                    <div className="col-md-3" style={{marginRight: '5px'}}>
                        <label htmlFor="inputState" className="form-label">Quantity:</label>
                        <input type="number" className="form-control" id="inputZip" placeholder="0" 
                        {...register('qtd')}
                        />
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                    {/* O tipo da quantidade: */}
                    <div className="input-group" style={{height: '2.2rem', width:'6rem', marginTop:'30px'}}>
                        <select className="form-select" id="inputGroupSelect01" {...register('qtdType')}>
                            <option>-Type-</option>
                            <option value="Kg">Kg</option>
                            <option value="L">L</option>
                            <option value="Und">UND</option>
                        </select>
                    </div>
                </div>
                {/* Descrição do produto: */}
                <div className="col-md-10">
                    <label htmlFor="inputCity" className="form-label">Description:</label>
                    <textarea name="inputCity" className="form-control" id="inputCity" rows="3" 
                    {...register('description')}>
                    </textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-success col-md-10">Add to Store</button>
            </form>
        </div>
    )
}

export default AdicionarProduto