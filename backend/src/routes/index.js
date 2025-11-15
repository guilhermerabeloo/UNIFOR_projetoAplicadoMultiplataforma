import express from "express";
import RelatoriosRoutes from "./RelatoriosRoutes.js";

// Criando funcao routes que recebe o express e configura as rotas padrao, alem de usar as rotas especificas com o arquivo RelatoriosRoutes
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Pagina inicial'})
    })

    app.route('/ping').get((req, res) => {
        res.status(200).send({titulo: 'pong!'})
    })

    app.use(
        express.json(),
        RelatoriosRoutes
    )
}

export default routes;