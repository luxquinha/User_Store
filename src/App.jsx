import './estilos/App.css';
import BarraMenu from './componentes/BarraMenu';
import RodaPe from './componentes/RodaPe';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BarraMenu/>
      <Outlet/>
      <RodaPe/>
    </div>
  );
}

export default App;
