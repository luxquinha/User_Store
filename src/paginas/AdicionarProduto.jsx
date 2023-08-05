import { Link } from "react-router-dom"
function AdicionarProduto(){
    return(
        <div style={{height: '100%' ,display: 'flex', alignItems: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <form class="row g-3" style={{height: '100%', width: '30rem',display: 'flex', flexDirection: 'column'}}>
                <div class="col-md-10">
                    <label for="inputZip" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="inputZip" placeholder="Nome do produto" required/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div class="col-md-4" style={{marginRight: '75px'}}>
                        <label for="inputState" class="form-label">Preço:</label>
                        <input type="text" class="form-control" id="inputZip" placeholder="R$ 00.00" required/>
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Quantidade:</label>
                        <input type="text" class="form-control" id="inputZip" placeholder="0" required/>
                    </div>
                </div>
                <div class="col-md-10">
                    <label for="inputCity" class="form-label">Descrição:</label>
                    <textarea name="inputCity" class="form-control" id="inputCity" rows="3"></textarea>
                </div>
                <Link to={'/produtos'} style={{textAlign: 'left'}}>
                    <button type="submit" className="btn btn-outline-primary">Adicionar ao Estoque</button>
                </Link>
            </form>
        </div>
    )
}

export default AdicionarProduto