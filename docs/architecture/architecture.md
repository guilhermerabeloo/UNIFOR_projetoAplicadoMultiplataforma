# Arquitetura final implementada

Arquitetura do projeto FeiraFlow — visão geral, componentes, fluxo de dados e instruções para rodar.

---

## Visão geral

* **Frontend**: React + Vite (SPA). Pasta: `frontend/`.
* **Backend**: Node.js + Express (API REST). Pasta: `backend/`. Entrypoint: `server.js`.
* **Banco**: MongoDB (conexão via `MONGO_URI`). Collections principais: `feiras`, `feirantes`.
* **Serviço externo**: Nominatim (OpenStreetMap) para geocodificação/consulta de localização. URL configurada por `NOMINATIM_URL`.
* **Testes**: Vitest (backend). Arquivo de testes: `backend/tests/relatorios.controller.test.js`.

---

## Estrutura de pastas

```
.
|-- backend/
|   |-- .env
|   |-- server.js
|   |-- src/
|   |   |-- app.js
|   |   |-- controllers/RelatoriosControllers.js
|   |   |-- models/Feirantes.js
|   |   |-- models/Feiras.js
|   |   |-- routes/RelatoriosRoutes.js
|   |   |-- services/nominatimService.js
|   |-- tests/relatorios.controller.test.js
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- lib/api.js
|   |-- index.html
|-- database/
|   |-- schema.sql
|-- docs/
|   |-- api/api_documentation.md
|   |-- architecture/architecture.md
```

---

## Componentes e responsabilidades

### Frontend

* **Stack:** React + Vite
* **Responsabilidade:** interface do usuário, roteamento cliente, chamadas à API (utilitário em `frontend/src/lib/api.js`).
* **Scripts (frontend/package.json):**

  * `dev`: `vite`
  * `build`: `vite build`
  * `preview`: `vite preview`

### Backend

* **Stack:** Node.js (ES Modules) + Express + Mongoose
* **Arquivo de entrada:** `server.js`
* **Responsabilidade:** expor endpoints REST, operar sobre o MongoDB, encapsular chamadas externas em `nominatimService.js`.
* **Scripts (backend/package.json):**

  * `dev`: `nodemon server.js`
  * `start`: `node server.js`
  * `test`: `vitest`

### Banco (MongoDB)

* **Collections principais:** `feiras`, `feirantes`.
* **Conexão:** via `MONGO_URI` (variável de ambiente). Exemplo: `mongodb+srv://feiraflow:<senha>@cluster0.mongodb.net/feiraflow?retryWrites=true&w=majority`.

### Serviço externo — Nominatim

* **Configuração:** `NOMINATIM_URL` (ex.: `https://nominatim.openstreetmap.org`).
* **Uso:** geocodificação e reverse geocoding para compor dados de localização.

---

## Fluxo de dados 

1. Usuário no navegador → frontend faz requisição HTTP JSON para o backend.
2. Backend processa a request (controller) → consulta o MongoDB via Mongoose.
3. Para dados de localização, backend chama Nominatim e combina o resultado.
4. Backend retorna JSON → frontend renderiza.

---

## Endpoints principais

Definidos em `backend/src/routes/RelatoriosRoutes.js`:

* `GET /buscar_feiras` — retorna lista de feiras.
* `GET /buscar_feiraLandingPage/:id` — retorna dados detalhados de uma feira.
* `GET /buscar_feirantes` — retorna lista de feirantes.
* `GET /buscar_feiranteLandingPage/:id` — retorna dados detalhados de um feirante.

---

## Exemplos de documentos (JSON)

**Feirante (exemplo)**

```json
{
  "_id": "64a1b2c3d4e5f67890123456",
  "nome": "João da Horta",
  "imagem": "https://exemplo.com/img/joao.jpg",
  "tags": ["verduras", "orgânico"],
  "agendaSemanal": {
    "seg": { "horarioFormatado": "08:00 - 12:00", "horaInicio": 480, "horaFinal": 720, "feira": "Feira Central" },
    "sab": { "horarioFormatado": "07:00 - 11:00", "horaInicio": 420, "horaFinal": 660, "feira": "Feira do Bairro" }
  },
  "listaProdutos": ["Alface", "Cenoura", "Rúcula"]
}
```

**Feira (exemplo)**

```json
{
  "_id": "64a9b8c7d6e5f43210123456",
  "descricao": "Feira Central",
  "imagem": "https://exemplo.com/img/feira.jpg",
  "tags": ["central", "domingos"],
  "agendaSemanal": {
    "dom": { "horarioFormatado": "06:00 - 13:00", "horaInicio": 360, "horaFinal": 780 }
  },
  "latitude": -3.721,
  "longitude": -38.524,
  "feirantes": ["64a1b2c3d4e5f67890123456"]
}
```

---

## Variáveis de ambiente (utilizadas atualmente)

* `MONGO_URI` — string de conexão do MongoDB.
* `NOMINATIM_URL` — URL base do Nominatim.

---

## Como rodar localmente (passo a passo mínimo)

1. **Instalar dependências**

   * Backend: `cd backend && npm install`
   * Frontend: `cd frontend && npm install`
2. **Configurar variáveis de ambiente**

   * Em `backend/.env` definir `MONGO_URI` e `NOMINATIM_URL`.
3. **Rodar backend (dev)**

   * `cd backend && npm run dev` (usa `nodemon server.js`).
4. **Rodar frontend (dev)**

   * `cd frontend && npm run dev` (Vite; padrão porta `5173`).
5. **Acessar**

   * Abrir a URL que o Vite imprime (ex.: `http://localhost:5173`) e usar a aplicação.

---

## Testes

* **Backend**: Vitest (configurado em `backend/package.json`).
* **Executar testes**: `cd backend && npm test`.
* **Cobertura dos testes**: testes unitários de controllers (mocks dos models) em `backend/tests/relatorios.controller.test.js`.

---

## Decisões arquiteturais

* **MongoDB**: escolhido pela flexibilidade do modelo de documentos, adequado para `feiras` e `feirantes` com subdocumentos (`agendaSemanal`).
* **Nominatim**: serviço público para geocodificação; isolado em `nominatimService.js` para facilitar possíveis melhorias (cache, fallback).
* **Testes**: unidades isoladas com mocks para garantir velocidade e determinismo.

---


