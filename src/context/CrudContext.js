// Hook para gerenciamento e criação de um contexto:
import { createContext, useState, useEffect } from "react";
// Criando um contexto:
export const CrudContext = createContext()
// Criando um provider do contexto que recebe um children:
function CrudContextProvider({children}){
    // Chave para povoar o localStorage:
    const productsKey = 'produtos'
    // Estados do contexto:
    const [id, setId] = useState(0)
    const [products, setProducts] = useState([])
    // Atualiza o localStorage sempre que mudar o estado products:
    useEffect(()=>{
        // Evita de perder os dados do localStorage quando atualizar a tela:
        if(products.length>=1){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }else if(products.length === 0 && localStorage.getItem(productsKey) === null){
            localStorage.setItem(productsKey, JSON.stringify(products))
        }
    },[products])
    // Função que atualiza os dados da aplicação de acordo com os dados do localStorage:
    const atualizarDados = ()=>{
        const conteudo = JSON.parse(localStorage.getItem(productsKey) || '[]')
        // Verifica o Id para não gerar id iguais em caso de atulizar a tela:
        const idAtual = Number(conteudo[conteudo.length-1]?.id)
        if(!isNaN(idAtual) && conteudo !== null){
            setId(idAtual+1)
        }
        setProducts(conteudo)
    }
    // Função que recebe os dados e adiciona um produto:
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
    
    const findIndexProduct = (id)=>{
        const index = products.findIndex(product => product.id === id)
        return index
    }
    // Função que recebe os dados e edita um produto existente:
    const editProduct = (productEditted, idProduct)=>{
        atualizarDados()
        const id = findIndexProduct(idProduct)
        products[id].name = productEditted.name
        products[id].price = productEditted.price
        products[id].qtd = productEditted.qtd
        products[id].qtdType = productEditted.qtdType
        products[id].description = productEditted.description
        // atualiza o estado dos produtos e envia pro localStorage:
        setProducts(products)
        localStorage.setItem(productsKey, JSON.stringify(products))
    }
    // Função que recebe o id do produto e exclui ele da lista:
    const clearItem = (id)=>{
        const newProduct = products.filter(product => product.id !== id)
        // Se excluir o último produto da lista ele zera a lista e envia pro localStorage:
        if(newProduct.length === 0){
            localStorage.setItem(productsKey ,JSON.stringify(newProduct))
            setProducts([])
            setId(0)
        //Atualiza a lista de produtos: 
        }else{
            setProducts(newProduct)
        }
    }
    return (
        // Envia estados e funções para o children (páginas privadas da aplicação):
        <CrudContext.Provider value={{products, addProduct, editProduct, atualizarDados, clearItem}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider