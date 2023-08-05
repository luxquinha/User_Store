import './estilos/App.css';
import BarraMenu from './componentes/BarraMenu';
import RodaPe from './componentes/RodaPe';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BarraMenu/>
      <div className="conteudo" style={{width: '100vw', height: '87.5vh'}}>
        <Outlet/>
      </div>
      <RodaPe/>
    </div>
  );
}

export default App;
