# Documentação da API — FeiraFlow

Base URL (ambiente local): `http://localhost:3000`
Content-Type: `application/json`

---

## Sumário

* [GET /buscar_feiras](#get-buscar_feiras)
* [GET /buscar_feiraLandingPage/:id](#get-buscar_feiralandingpageid)
* [GET /buscar_feirantes](#get-buscar_feirantes)
* [GET /buscar_feiranteLandingPage/:id](#get-buscar_feirantelandingpageid)
* [Como testar localmente](#como-testar-localmente)

---

## GET /buscar_feiras

Retorna a lista de todas as feiras cadastradas.

* **Method:** `GET`
* **Path:** `/buscar_feiras`
* **Parâmetros:** nenhum
* **Headers:** recomendado `Accept: application/json`

### Respostas

* **200 OK**
  Corpo: array de objetos `Feira` (padrão conforme model em `backend/src/models/Feiras.js`). Exemplo:

  ```json
  [
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
  ]
  ```
* **500 Internal Server Error**

  ```json
  { "error": "Erro buscar feiras" }
  ```

---

## GET /buscar_feiraLandingPage/:id

Retorna os dados detalhados de uma feira, consultando por `_id`.

* **Method:** `GET`
* **Path:** `/buscar_feiraLandingPage/:id`
* **Parâmetros de rota:**

  * `id` (string) — `_id` da feira no MongoDB.

### Respostas

* **200 OK**
  Corpo: objeto `Feira` ou `null` se não encontrada. Exemplo:

  ```json
  {
    "_id": "64a9b8c7d6e5f43210123456",
    "descricao": "Feira Central",
    "imagem": "https://exemplo.com/img/feira.jpg",
    "tags": ["central", "domingos"],
    "agendaSemanal": { "dom": { "horarioFormatado": "06:00 - 13:00", "horaInicio": 360, "horaFinal": 780 } },
    "latitude": -3.721,
    "longitude": -38.524,
    "feirantes": ["64a1b2c3d4e5f67890123456"]
  }
  ```

* **500 Internal Server Error**
  ```json
  { "error": "Erro ao montar landing page da feira" }
  ```

---

## GET /buscar_feirantes

Retorna a lista de todos os feirantes cadastrados.

* **Method:** `GET`
* **Path:** `/buscar_feirantes`
* **Parâmetros:** nenhum

### Respostas

* **200 OK**
  Corpo: array de objetos `Feirante`. Exemplo:

  ```json
  [
    {
      "_id": "64a1b2c3d4e5f67890123456",
      "nome": "João da Horta",
      "imagem": "https://exemplo.com/img/joao.jpg",
      "tags": ["verduras","orgânico"],
      "agendaSemanal": {
        "seg": { "horarioFormatado": "08:00 - 12:00", "horaInicio": 480, "horaFinal": 720, "feira": "Feira Central" }
      },
      "listaProdutos": ["Alface", "Cenoura", "Rúcula"]
    }
  ]
  ```
* **500 Internal Server Error**

  ```json
  { "error": "Erro buscar feirantes" }
  ```

---

## GET /buscar_feiranteLandingPage/:id

Retorna os dados detalhados de um feirante por `_id`.

* **Method:** `GET`
* **Path:** `/buscar_feiranteLandingPage/:id`
* **Parâmetros de rota:**

  * `id` (string) — `_id` do feirante no MongoDB.

### Respostas

* **200 OK**
  Corpo: objeto `Feirante` ou `null` se não encontrado. Exemplo:

  ```json
  {
    "_id": "64a1b2c3d4e5f67890123456",
    "nome": "João da Horta",
    "imagem": "https://exemplo.com/img/joao.jpg",
    "tags": ["verduras","orgânico"],
    "agendaSemanal": { "seg": { "horarioFormatado": "08:00 - 12:00", "horaInicio": 480, "horaFinal": 720, "feira": "Feira Central" } },
    "listaProdutos": ["Alface","Cenoura","Rúcula"]
  }
  ```

* **500 Internal Server Error**

  ```json
  { "error": "Erro ao montar landing page do feirante" }
  ```

---

## Como testar localmente

1. Defina `MONGO_URI` e `NOMINATIM_URL` em `backend/.env`.
2. Instale dependências:

   * `cd backend && npm install`
3. Rodar servidor:

   * `cd backend && npm run dev` (usa `nodemon server.js`, servidor em `http://localhost:3000`).
4. Testes unitários:

   * `cd backend && npm test` (Vitest — arquivo de testes: `backend/tests/relatorios.controller.test.js`).

---