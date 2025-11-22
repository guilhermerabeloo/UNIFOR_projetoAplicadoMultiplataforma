# FeiraFlow

## 1. Título e descrição do projeto

**FeiraFlow** é uma aplicação web desenvolvida para facilitar o acesso a informações sobre feiras e feirantes locais. O sistema permite visualizar detalhes das feiras cadastradas, seus participantes e localização geográfica.  
O principal objetivo é aproximar consumidores e produtores, promovendo o comércio justo e o fortalecimento das economias regionais.

---

## 2. Funcionalidades implementadas

### 🟢 Funcionalidades principais
- Listagem de feiras cadastradas.
- Visualização detalhada de cada feira (landing page individual).
- Listagem de feirantes cadastrados.
- Visualização detalhada de cada feirante (landing page individual).
- Obtenção de coordenadas geográficas via API do OpenStreetMap (Nominatim).
- Comunicação entre o front-end (React) e o back-end (Node.js + Express + MongoDB).

### 💬 Status de implementação
- Funcionalidades listadas estão **completas** e testadas, com disponibilização pública usando Vercel.
![Home desktop](/assets/readme-home-desktop.png)
![Home mobile(responsivo)](/assets/readme-home-mobile.png)
![Feira LandingPage desktop](/assets/readme-landingpage-desktop.png)
![Feira LandingPage mobile(responsivo)](/assets/readme-landingpage-mobile.png)

---

## 3. Tecnologias utilizadas

| Camada | Tecnologias |
|--------|--------------|
| **Frontend** | React, Vite, React Router DOM, Axios, Lucide-React, React Icons |
| **Backend** | Node.js, Express, Mongoose, Axios, Nodemon, Node-Cache |
| **Banco de Dados** | MongoDB Atlas |
| **Testes** | Vitest e Supertest |
| **Ferramentas** | Visual Studio Code, Git, GitHub, Vercel |

---

## 4. Arquitetura do sistema

A aplicação foi estruturada de forma modular, com separação clara entre **frontend** e **backend**.

```
/FeiraFlow
│
├── backend/
│   ├── config/
│   │   └── mongoDb.js
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   │   └── RelatoriosControllers.js
│   │   ├── models/
│   │   │   ├── Feiras.js
│   │   │   └── Feirantes.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── RelatoriosRoutes.js
│   │   └── services/
│   │       └── nominatimService.js
│   ├── tests/
│   │   └── relatorios.controller.test.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

A aplicação front-end se comunica com o backend por meio de requisições HTTP (Axios).  
O backend utiliza o **Express** para expor endpoints RESTful e o **Mongoose** para interação com o **MongoDB Atlas**.  
As coordenadas geográficas são obtidas via **API Nominatim (OpenStreetMap)** e armazenadas temporariamente em cache para reduzir latência.

---

## 5. Instruções de instalação e execução

### 🧩 Pré-requisitos
- Node.js (versão 18 ou superior)
- npm
- Conta no MongoDB Atlas (ou banco Mongo local)

### ⚙️ Passos de instalação

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/guilhermerabeloo/UNIFOR_projetoAplicadoMultiplataforma.git 
   cd feiraflow
   ```

2. **Instalar dependências**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configurar variáveis de ambiente (backend)**
   Criar um arquivo `.env` dentro de `/backend`:
   ```env
   MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net
   NOMINATIM_URL=https://nominatim.openstreetmap.org
   ```

4. **Executar o backend**
   ```bash
   cd backend
   npm run dev
   ```

5. **Executar o frontend**
   ```bash
   cd frontend
   npm run dev
   ```

---

## 6. Acesso ao sistema

- **URL (produção):** https://feira-flow-frontend.vercel.app/ 
- **Ambiente local:**
  - Frontend: http://localhost:5173  
  - Backend: http://localhost:3000

---

## 7. Validação com Público-Alvo

A validação do **FeiraFlow** foi realizada entre **10/11/2025 e 15/11/2025**, por meio de uma **reunião online (Google Meet)** e **demonstração prática da aplicação**.  
O público-alvo participante foi composto por:

- **Amanda Havila** — consumidora de feiras livres.  
- **Gabriel Lima** — filho de feirante local.

Durante o processo, foram apresentados os principais fluxos da aplicação (home, feiras, feirantes e landing pages).  
Os participantes responderam a um **formulário de feedback (Google Forms)**, e seus comentários resultaram em melhorias diretas na interface.

### 🗣️ Principais feedbacks e ações
| Feedback | Ação implementada |
|-----------|-------------------|
| Mostrar se a feira está aberta ou fechada logo na tela inicial | Implementado: exibição do status na Home. |
| Adicionar botão "Como Chegar" na página da feira | Implementado: redireciona para o Google Maps. |
| Facilidade geral de uso avaliada com 5/5 pelos dois participantes | Nenhum ajuste necessário. |

### 📊 Resultados resumidos
- Faixa etária dos participantes: **25–34 anos (100%)**  
- Frequência em feiras: **50% regularmente, 50% ocasionalmente**  
- Facilidade de navegação: **média 5/5**  
- Incentivo a frequentar mais feiras: **média 5/5**

📁 **Relatório completo:** [`validation/validation_report.md`](validation/validation_report.md)  

---

## 8. Equipe de desenvolvimento

| Nome | Contribuição |
|------|---------------|
| **Marcos Guilherme Rabelo, 2415512** | Correção de bugs finais, Validação com o público alvo, configuração do repositório oficial e da publicação no Vercel |
| **Ricardo Montesuma Filho, 2327749** | Implementação do front-end |
| **Fernando Ivo Negreiro da Silva, 2317776** | Implementação do back-end e testes |
| **Carlos Roberto Pereira da Silva Filho, 2326155** | Implementação do banco de dados |
| **Antônia Tamires Melo de Sousa, 2314703** | Organização da documentação do projeto |

---
