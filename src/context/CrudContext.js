import { createContext, useState, useEffect } from "react";

export const CrudContext = createContext()

function CrudContextProvider({children}){
    const productsKey = 'produtos'
    const [id, setId] = useState(0)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        if(products.length>=1){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }
    },[products])
    
    const atualizarDados = ()=>{
        if(products.length === 0 && localStorage.getItem(productsKey) === null){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }
        const conteudo = JSON.parse(localStorage.getItem(productsKey) || '[]')
        const idAtual = Number(conteudo[conteudo.length-1]?.id)
        if(!isNaN(idAtual)){
            setId(idAtual+1)
        }
        setProducts(conteudo)
    }

    const addProduct = (data)=>{
        atualizarDados()
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
        <CrudContext.Provider value={{products, addProduct, editProduct, atualizarDados}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider