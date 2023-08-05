import './estilos/App.css';
import BarraMenu from './componentes/BarraMenu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BarraMenu/>
      <Outlet/>
    </div>
  );
}

export default App;
