import 'bootstrap/dist/css/bootstrap.min.css'

function Produtos(){
    return(
        <div>
            <button type="button" class="btn btn-outline-info" style={{margin: '10px 10px'}}>+ Adicionar Produto</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default Produtos