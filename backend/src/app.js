import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from "../config/mongoDb.js";

//  Configura as variaveis de ambiente e conectando no banco de dados
dotenv.config();
connectDB();

// Configurando o express na variavel app e passando ela para a funcao routes para configurar o roteamento da API
const app = express();
app.use(express.json());

app.use(cors());

routes(app);

export default app;