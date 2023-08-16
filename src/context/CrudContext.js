import { createContext, useState, useEffect } from "react";

export const CrudContext = createContext()

function CrudContextProvider({children}){
    const productsKey = 'produtos'
    const [id, setId] = useState(0)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        if(products.length>=1){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }else if(products.length === 0 && localStorage.getItem(productsKey) === null){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }
    },[products])
    
    const atualizarDados = ()=>{
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
        alert('Produto cadastrado com sucesso!')
    }

    const editProduct = (productEditted, idProduct)=>{
        atualizarDados()
        products[idProduct].name = productEditted.name
        products[idProduct].price = productEditted.price
        products[idProduct].qtd = productEditted.qtd
        products[idProduct].qtdType = productEditted.qtdType
        products[idProduct].description = productEditted.description
        // atualiza o estado dos produtos e envia pro localStorage:
        setProducts(products)
        localStorage.setItem(productsKey, JSON.stringify(products))

        return
    }
    
    return (
        <CrudContext.Provider value={{products, addProduct, editProduct, atualizarDados}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider