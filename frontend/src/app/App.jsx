import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/paleta.css';
import './App.css';

// Configurando o componente principal da aplicacao web, com o header sempre presente e o componente especifico da rota atual com o outlet
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
