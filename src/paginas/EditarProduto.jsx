import React, {useState} from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

    const objectFormSchema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        price: z.string().nonempty('Informe o valor do produto').regex(/([0-9]{1,}.?)/g, 'Tipo inválido'),
        qtd: z.string().nonempty('Informe a quantidade do produto').regex(/[0-9]/g, 'Tipo inválido'),
        description: z.string().max(60, 'Excedeu a quantidade máxima de caracteres')
    })

function EditarProduto(){
    const { register, handleSubmit, formState:{errors}} = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(objectFormSchema)
    })

    const editProduct = (data)=>{
        console.log(data);
    }
    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <form class="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column'}}
            onSubmit={handleSubmit(editProduct)}
            >
                <div class="col-md-10">
                    <label for="inputZip" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="inputZip" placeholder="Nome do produto" {...register('name')}/>
                    {errors.name && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.name.message}</p>)}
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div class="col-md-4" style={{marginRight: '75px'}}>
                        <label for="inputState" class="form-label">Preço:</label>
                        <input type="text" class="form-control" id="inputZip" placeholder="R$ 00.00" {...register('price')}/>
                        {errors.price && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.price.message}</p>)}
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Quantidade:</label>
                        <input type="text" class="form-control" id="inputZip" placeholder="0" {...register('qtd')}/>
                        {errors.qtd && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.qtd.message}</p>)}
                    </div>
                </div>
                <div class="col-md-10">
                    <label for="inputCity" class="form-label">Descrição:</label>
                    <textarea name="inputCity" class="form-control" id="inputCity" rows="3" {...register('description')}></textarea>
                    {errors.description && (<p style={{fontSize: '0.8rem', color: 'red'}}>{errors.description.message}</p>)}
                </div>
                    <button type="submit" className="btn btn-outline-primary">Editar Produto</button>
            </form>
        </div>
    )
}

export default EditarProduto