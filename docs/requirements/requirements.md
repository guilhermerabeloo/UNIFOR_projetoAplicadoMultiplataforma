# Levantamento de Requisitos — FeiraFlow

## Requisitos Funcionais (RF)

**RF-01 — Listar feiras**  
- Exibir lista de feiras com id, descrição, imagem e coordenadas.  
- Critério: `GET /buscar_feiras` retorna array.  

**RF-02 — Detalhe da feira (landing page)**  
- Mostrar agenda, feirantes, imagens e localização.  
- Critério: `GET /buscar_feiraLandingPage/:id` retorna objeto.  

**RF-03 — Listar feirantes**  
- Exibir lista de feirantes com dados básicos.  
- Critério: `GET /buscar_feirantes` retorna array.  

**RF-04 — Detalhe do feirante (landing page)**  
- Mostrar agenda, produtos e feiras relacionadas.  
- Critério: `GET /buscar_feiranteLandingPage/:id` retorna objeto.  

**RF-05 — Agenda semanal (feirante)**  
- Estrutura no documento para dias, horaInicio, horaFinal e feira.  
- Critério: campo `agendaSemanal` presente nos modelos.  

**RF-06 — Indicação aberto/fechado**  
- Mostrar na Home e nas landing pages se a feira/feirante está funcionando no momento.  
- Critério: frontend calcula horário e exibe status.  

**RF-07 — Botão “Como Chegar”**  
- Abrir rota no Google Maps para lat,long.  
- Critério: link abre nova aba com `destination=lat,lon`.  

**RF-08 — Geocodificação (Nominatim)**  
- Backend obtém coordenadas via Nominatim e usa cache.  
- Critério: `nominatimService` retorna coords ou null; cache aplicado.  

---

## Requisitos Não Funcionais (RNF)

**RNF-01 — Responsividade / multiplataforma**  
- A web app funciona em mobile e desktop (CSS com media queries).  

**RNF-02 — Performance básica**  
- Consultas rápidas em uso normal; cache para Nominatim.  

**RNF-03 — Disponibilidade**  
- Sistema disponível para testes; deploy planejado no Vercel.  

**RNF-04 — Compatibilidade de navegadores**  
- Suporte básico a Chrome, Firefox e Edge.  

**RNF-05 — Testes**  
- Testes unitários com Vitest no backend.  

---
