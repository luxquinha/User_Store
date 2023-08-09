import React, {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

    const objectFormSchema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        price: z.string().nonempty('Informe o valor do produto').regex(/([0-9]{1,}.?)/g, 'Tipo inválido'),
        qtd: z.string().nonempty('Informe a quantidade do produto').regex(/[0-9]/g, 'Tipo inválido'),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres')
    })

function AdicionarProduto(){
    const [product, setProduct] = useState([])
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: zodResolver(objectFormSchema),
        mode: 'onSubmit'
    })

    const createProduct = (data)=>{
        setProduct(JSON.stringify(data, null, 1))
        console.log(data);
    }

    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <form className="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column'}}
            onSubmit={handleSubmit(createProduct)}
            >
                <div className="col-md-10">
                    <label htmlFor="inputZip" className="form-label">Nome:</label>
                    <input type="text" className="form-control" id="inputZip" placeholder="Nome do produto" 
                    {...register('name')}
                    />
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="col-md-4" style={{marginRight: '75px'}}>
                        <label htmlFor="inputState" className="form-label">Preço:</label>
                        <input type="text" className="form-control" id="inputZip" placeholder="R$ 00.00" 
                        {...register('price')}
                        />
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">Quantidade:</label>
                        <input type="number" className="form-control" id="inputZip" placeholder="0" 
                        {...register('qtd')}
                        />
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                </div>
                <div className="col-md-10">
                    <label htmlFor="inputCity" className="form-label">Descrição:</label>
                    <textarea name="inputCity" className="form-control" id="inputCity" rows="3" 
                    {...register('description')}>
                    </textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-primary">Adicionar ao Estoque</button>
            </form>
            <pre>{product}</pre>
        </div>
    )
}

export default AdicionarProduto