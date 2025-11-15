import app from './src/app.js';

const PORT = 3000;

// ligando o server e fazendo ele escutar na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
