import { createContext, useState } from "react";

export const CrudContext = createContext()

function CrudContextProvider({children}){
    const [id, setId] = useState(0)
    const [products, setProducts] = useState([{
        name: 'Pão',
        price: 4.50,
        qtd: 10,
        description: 'Pão de hamburguer com alpiste',
        id: id
    }])

    // const addProduct = (infos)=>{
    //     if(infos !== undefined){
    //         const newProduct = [...products,{
    //             name: infos.name,
    //             price: Number(infos.price),
    //             qtd: Number(infos.qtd),
    //             description: infos.description
    //         }]
    //         setProducts(newProduct)
    //     }
    // }

    return (
        <CrudContext.Provider value={products} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider