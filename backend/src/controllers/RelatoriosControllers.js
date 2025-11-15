import Feirante from "../models/Feirantes.js";
import Feira from "../models/Feiras.js";

// Criando controller de relatorios que configura todos os metodos chamados pelos endpoints do router
class RelatoriosControllers {

    // Metodo que busca todas as feiras do banco
    static async buscarFeiras(req, res) {
        try {
            const feiras = await Feira.find();
            console.log("Buscando feiras...");
            
            res.json(feiras);
        } catch (error) {
            res.status(500).json({ error: "Erro buscar feiras" });
        }    
    }

    // Metodo que busca os detalhes da feira passada como parametro por meio do id
    static async feiraLandingPage(req, res) {
        try {
            const { id } = req.params;
            const feira = await Feira.findById(id).lean();

            return res.json(feira);

        } catch (error) {
            console.error('feiraLandingPage error', error);
            return res.status(500).json({ error: 'Erro ao montar landing page da feira' });
        }
    }

    // Metodo que busca todas os feirantes do banco
    static async buscarFeirantes(req, res) {
        try {
            const feirantes = await Feirante.find();
            console.log("Buscando feirantes...");
            
            res.json(feirantes);
        } catch (error) {
            res.status(500).json({ error: "Erro buscar feirantes" });
        }    
    }

    // Metodo que busca os detalhes do feirante passada como parametro por meio do id
    static async feiranteLandingPage(req, res) {
        try {
            const { id } = req.params;
            const feirante = await Feirante.findById(id).lean();

            return res.json(feirante);

        } catch (error) {
            console.error('feiranteLandingPage error', error);
            return res.status(500).json({ error: 'Erro ao montar landing page do feirante' });
        }
    }
}

export default RelatoriosControllers;