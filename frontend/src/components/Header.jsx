import './css/Header.css'
import logo from '../assets/logo.png'
import { BsList, BsSearch  } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'

// Criacao do componente do header que sera usado no app para ser mostrado em todas partes da aplicacao web
export default function Header() {
    const navigate = useNavigate();

    // Criando funcao que redireciona o usuario para a home
    const handleClickHome = () => {
        navigate(`/home`)
    }

    return (
        <>
            <div id="header">
                <div id="area-utilizavel">
                    <div id="area-logo">
                        <div id="butao-home-header" onClick={() => handleClickHome()}>
                            <img src={logo} alt="logo" id="img-logo"/>
                            <h1 id="titulo-logo">Feira Flow</h1>
                        </div>
                    </div>
                    <div id="area-busca">
                        <input type="text" placeholder="O que você está buscando?" id="input-busca"/>
                        <button id="btn-busca"><BsSearch /></button>
                    </div>
                    <div id="area-menu">
                        <BsList className="menu-list"/>
                    </div>
                </div>
            </div>
        </>
    )
}