import express from 'express';
import RelatoriosControllers from '../controllers/RelatoriosControllers.js';

// Criando as rotas de relatorios e exportando o roteamento para ser usado no roteador central index.js
const router = express.Router();

router
    .get('/buscar_feiras', RelatoriosControllers.buscarFeiras)
    .get('/buscar_feiraLandingPage/:id', RelatoriosControllers.feiraLandingPage)
    .get('/buscar_feirantes', RelatoriosControllers.buscarFeirantes)
    .get('/buscar_feiranteLandingPage/:id', RelatoriosControllers.feiranteLandingPage)

export default router;

