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

    const editProduct = (productEditted)=>{
        const editProduct = products.map(product => {
            if(product.id === productEditted.id){
                product.name = productEditted.name
                product.price = productEditted.price
                product.qtd = productEditted.qtd
                product.qtdType = productEditted.qtdType
                product.description = productEditted.description
                product.id = productEditted.id
            }else{
                product = product
            }
        })
        // setProducts(editProduct)
        console.log(editProduct);
    }

    return (
        <CrudContext.Provider value={{products, addProduct, editProduct}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider