import './css/LandingPageFeirante.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from '../lib/api.js'

// Criacao do componente que mostra os detalhes da feira selecionada pelo usuario
export default function LandingPageFeira() {
    const { id } = useParams(); // Captura o id passado como parametro na url chamada pelo usuario
    const [feiranteFuncionando, setFeiranteFuncionando] = useState(true);
    const [detalhamentoFeirante, setDetalhamentoFeirante] = useState({});

    // buscando feirante selecionada para detalhamento no componente
    useEffect(() => {
        async function fetchFeirantes() {
            try {
                const response = await api.get(`/buscar_feiranteLandingPage/${id}`)
                setDetalhamentoFeirante(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchFeirantes()
    }, [id]);

    // verificando se o feirante está funcionando no dia atual
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

        const horaAberturaDiaAtual = detalhamentoFeirante?.agendaSemanal?.[diaSemanaAtualStr]?.horaInicio ?? null;
        const horaFechamentoDiaAtual = detalhamentoFeirante?.agendaSemanal?.[diaSemanaAtualStr]?.horaFinal ?? null;
        
        if (horaAberturaDiaAtual === null || horaFechamentoDiaAtual === null) {
            setFeiranteFuncionando(false);
            return;
        } else if (horarioAgora >= horaAberturaDiaAtual && horarioAgora <= horaFechamentoDiaAtual) {
            setFeiranteFuncionando(true);
            return;
        } else {
            setFeiranteFuncionando(false);
            return;
        }
    }, [detalhamentoFeirante]);

    // configuracao do HTML dinamico da pagina
    return (
        <>
            <div className="container-landingpagefeirante">
                <div className="resumo-feirante">
                    <div className="perfil-feirante">
                        <img src={detalhamentoFeirante.imagem} alt="Foto de perfil" id="foto-perfil-feirante"/>
                        <div className="dados-feirante">
                            <div id="titulo-resumo-feirante">
                                <h2>{detalhamentoFeirante.descricao}</h2>
                            </div>
                            <div id="tagscategoria-feirante">
                                <ul>
                                    {
                                        detalhamentoFeirante?.tags?.map((tag, index) => (
                                            <li key={index}>{tag}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="avaliacoes-feirante">
                                ★★★★☆
                            </div>
                        </div>
                    </div>
                    <div id="detalhamento-funcionamento-feirante">
                        <h4>Agenda semanal</h4>
                        <p><span>Seg: </span>{detalhamentoFeirante?.agendaSemanal?.seg?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.seg?.feira}</span></p>
                        <p><span>Ter: </span>{detalhamentoFeirante?.agendaSemanal?.ter?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.ter?.feira}</span></p>
                        <p><span>Qua: </span>{detalhamentoFeirante?.agendaSemanal?.qua?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.qua?.feira}</span></p>
                        <p><span>Qui: </span>{detalhamentoFeirante?.agendaSemanal?.qui?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.qui?.feira}</span></p>
                        <p><span>Sex: </span>{detalhamentoFeirante?.agendaSemanal?.sex?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.sex?.feira}</span></p>
                        <p><span>Sáb: </span>{detalhamentoFeirante?.agendaSemanal?.sab?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.sab?.feira}</span></p>
                        <p><span>Dom: </span>{detalhamentoFeirante?.agendaSemanal?.dom?.horarioFormatado}. <span>{detalhamentoFeirante?.agendaSemanal?.dom?.feira}</span></p>
                    </div>
                    <div id="funcionamento-dia-atual">
                        <h4>Funcionamento agora</h4>
                        {
                        !feiranteFuncionando
                            ? (
                                <p id="feira-fechada">● Fechada</p>
                            )
                            : (
                                <>
                                    <p id="feira-aberta">● Aberto agora na {detalhamentoFeirante?.feiraNoDia?.feira}</p>
                                    <div className="map-wrapper" style={{ width: "100%", height: 200 }}>
                                    <iframe
                                        title="Mapa da localização"
                                        src={`https://www.google.com/maps?q=${detalhamentoFeirante?.feiraNoDia?.latitude},${detalhamentoFeirante?.feiraNoDia?.longitude}&z=15&output=embed`}
                                        allowFullScreen
                                        loading="lazy"
                                        style={{ width: "100%", height: "100%", border: 0 }}
                                    />
                                    </div>
                                    <div className="localizacao-como-chegar" style={{ marginTop: 8 }}>
                                    <button
                                        id="como-chegar"
                                        type="button"
                                        onClick={() => { //Configurando o redirecionamento do usuario para o maps ao clicar em como chegar
                                            window.open(
                                                `https://www.google.com/maps/dir/?api=1&destination=${detalhamentoFeirante?.feiraNoDia?.latitude},${detalhamentoFeirante?.feiraNoDia?.longitude}`,
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Como chegar
                                    </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="produtos-feirante">
                    <h4>Produtos / Serviços</h4>
                    <div id="lista-produtos-feirante">
                        <ul>
                            {
                                detalhamentoFeirante?.listaProdutos?.map((produto, index) => (
                                    <li key={index}>{produto}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}