import { createContext, useState } from "react";

export const CrudContext = createContext()

function CrudContextProvider({children}){
    const [id, setId] = useState(1)
    const [products, setProducts] = useState([{
        name: 'Pão',
        price: 4.50,
        qtd: 10,
        description: 'Pão de hamburguer com alpiste',
        qtdType: 'Und',
        id: 0
    }])

    const addProduct = (data)=>{
        const newProduct = [...products,{
            name: data.name,
            price: Number(data.price),
            qtd: Number(data.qtd),
            description: data.description,
            qtdType: data.qtdType,
            id: id
        }]
        setId(id+1)
        setProducts(newProduct)
    }

    return (
        <CrudContext.Provider value={{products, addProduct}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider