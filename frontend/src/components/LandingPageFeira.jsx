import './css/LandingPageFeira.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../lib/api.js'

// Criacao do componente que mostra os detalhes do feirante selecionada pelo usuario
export default function LandingPageFeira() {
    const { id } = useParams(); // Captura o id passado como parametro na url chamada pelo usuario
    const navigate = useNavigate();
    const [feiraFuncionando, setFeiraFuncionando] = useState(true);
    const [detalhamentoFeira, setDetalhamentoFeira] = useState({});

    // buscando feira selecionada para detalhamento no componente
    useEffect(() => {
        async function fetchFeiras() {
            try {
                const response = await api.get(`/buscar_feiraLandingPage/${id}`)
                setDetalhamentoFeira(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchFeiras()
    }, [id]);
    
    // verificando se a feira está funcionando no dia atual
    useEffect(() => {
        const diaSemanaMapeado = {
            1: 'seg',
            2: 'ter',
            3: 'qua',
            4: 'qui',
            5: 'sex',
            6: 'sab',
            7: 'dom'
        }
    
        const dataAtual = new Date();
        const horarioAgora = dataAtual.getHours() + (dataAtual.getMinutes() / 60);
        let diaSemanaAtualInt = dataAtual.getDay();
        diaSemanaAtualInt = diaSemanaAtualInt === 0 ? 7 : diaSemanaAtualInt;
    
        const diaSemanaAtualStr = diaSemanaMapeado[diaSemanaAtualInt];
    
        const horaAberturaDiaAtual = detalhamentoFeira?.agendaSemanal?.[diaSemanaAtualStr]?.horaInicio ?? null;
        const horaFechamentoDiaAtual = detalhamentoFeira?.agendaSemanal?.[diaSemanaAtualStr]?.horaFinal ?? null;
        
        if (horaAberturaDiaAtual === null || horaFechamentoDiaAtual === null) {
            setFeiraFuncionando(false);
            return;
        } else if (horarioAgora >= horaAberturaDiaAtual && horarioAgora <= horaFechamentoDiaAtual) {
            setFeiraFuncionando(true);
            return;
        } else {
            setFeiraFuncionando(false);
            return;
        }
        
    }, [detalhamentoFeira])

    // Criando funcao que redireciona o usuario caso ele queira detalhar um feirante vinculado a feira
    const handleClickDetalhamento = (idfeirante) => {
        navigate(`/landingpagefeirante/${idfeirante}`)
    };

    // configuracao do HTML dinamico da pagina
    return (
        <>
            <div className="container-landingpagefeira">
                <div className="resumo-feira">
                    <div id="titulo-resumo-feira">
                        <h2>{detalhamentoFeira.descricao}</h2>
                        <div className="feira-funcionandoagora">
                            {feiraFuncionando ? <p id="feira-aberta">● Aberto agora</p> : <p id="feira-fechada">● Fechada</p>}
                        </div>
                    </div>
                    <div id="tagsprodutos-feira">
                        <ul>
                            {
                                detalhamentoFeira?.tags?.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div id="detalhamento-funcionamento-feira">
                        <h4>Funcionamento</h4>
                        <p><span>Seg: </span>{detalhamentoFeira?.agendaSemanal?.seg?.horarioFormatado}.</p>
                        <p><span>Ter: </span>{detalhamentoFeira?.agendaSemanal?.ter?.horarioFormatado}.</p>
                        <p><span>Qua: </span>{detalhamentoFeira?.agendaSemanal?.qua?.horarioFormatado}.</p>
                        <p><span>Qui: </span>{detalhamentoFeira?.agendaSemanal?.qui?.horarioFormatado}.</p>
                        <p><span>Sex: </span>{detalhamentoFeira?.agendaSemanal?.sex?.horarioFormatado}.</p>
                        <p><span>Sáb: </span>{detalhamentoFeira?.agendaSemanal?.sab?.horarioFormatado}.</p>
                        <p><span>Dom: </span>{detalhamentoFeira?.agendaSemanal?.dom?.horarioFormatado}.</p>
                    </div>
                    <div id="resumo-feirantes-feira">
                        <h4>Feirantes</h4>
                        <div className="feirante-feira">
                            {
                                detalhamentoFeira?.feirantes?.map((feirantefeira, index) => (
                                    <img 
                                        key={index} 
                                        src={feirantefeira.imagem} 
                                        title={`Visitar ${feirantefeira.descricao}`}
                                        onClick={() => handleClickDetalhamento(feirantefeira.id)} // Direcionando o usuario para o detalhamento do feirante
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="midia-feira">
                    <div className="imagens-feira">
                        <h4>Destaques</h4>
                        <img src={detalhamentoFeira?.imagem} alt="Beira Mar"/>
                    </div>
                    <div className="localizacao-feira">
                        <h4>Localização</h4>
                        <div className="map-wrapper">
                            <iframe
                                title="Mapa da localização"
                                src={`https://www.google.com/maps?q=${detalhamentoFeira?.latitude},${detalhamentoFeira?.longitude}&z=15&output=embed`}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        <div className="localizacao-como-chegar">
                            <button id="como-chegar"
                                onClick={() => { //Configurando o redirecionamento do usuario para o maps ao clicar em como chegar
                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${detalhamentoFeira?.latitude},${detalhamentoFeira?.longitude}`, "_blank");
                                }}
                            >
                            Como chegar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}