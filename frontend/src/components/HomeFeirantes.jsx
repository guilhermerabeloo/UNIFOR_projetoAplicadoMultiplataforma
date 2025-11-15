import './css/HomeFeirantes.css'
import './css/Home.css'
import { api } from '../lib/api.js'

import InfiniteCarousel from './CarrosselInfinito.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Criacao do componente que controla os feirantes em destaque na pagina home
export default function HomeFeirantes() {
    const navigate = useNavigate();
    const [feirantesEmDestaque, setFeirantesEmDestaque] = useState([]);

    // buscando feirantes para detalhamento no componente
    useEffect(() => {
        async function fetchFeirantes() {
            const response = await api.get('/buscar_feirantes')
            setFeirantesEmDestaque(response.data)
        }

        fetchFeirantes()
    }, [])

    // Criando funcao que redireciona o usuario caso ele queira detalhar um feirante
    const handleClickDetalhamento = (idfeirante) => {
        navigate(`/landingpagefeirante/${idfeirante}`)
    };

    // configuracao do HTML dinamico da pagina
    return (
        <>
            <div id="container-homefeirantes">
                <h2 className="titulo-sessao-home">Feirantes em destaque</h2>
                <div className="conteudo-sessao-home">
                    {/* Utilizando o componente InfiniteCarousel para configurar a visibilidade dos feirantes em forma de carrossel */}
                    <InfiniteCarousel>
                        {
                            feirantesEmDestaque.map((feirante, index) => (
                                <div className="destaque-home" key={index} onClick={() => handleClickDetalhamento(feirante._id)}>
                                    <div className="img-destaque-home">
                                        <img src={feirante.imagem}/>
                                    </div>
                                    <h4>{feirante.descricao}</h4>
                                </div>
                            ))
                        }
                    </InfiniteCarousel>
                </div>
            </div>
        </>
    )
}