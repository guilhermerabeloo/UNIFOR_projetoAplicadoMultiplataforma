import './css/Home.css'
import HomeFeirantes from "./HomeFeirantes";
import HomeFeiras from "./HomeFeiras";

// Criacao do componente da pagina home utilizando subcomponentes de feiras e feirantes
export default function Home() {
    return (
        <>
            <div id="container-home">
                <HomeFeiras />
                <HomeFeirantes />
            </div>
        </>
    )
}