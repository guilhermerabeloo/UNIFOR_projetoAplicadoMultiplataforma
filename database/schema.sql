/*
    IMPORTANTE: 
        Este projeto usa MongoDB. As collections acima representam os "esquemas" implementados via Mongoose.
        Este arquivo apenas existe para atender ao requisito da disciplina "o repositório deve seguir exatamente a estrutura proposta", mas não se aplica ao nosso projeto, ja que usamos banco de dados noSql.
        Para uma melhor visualização dos schemas implementados corretamente no nosso projeto, analisar a pasta /backend/src/models/
*/

-- COLLECTION: feirantes
-- Campos:
-- _id               : ObjectId (PK)
-- nome              : varchar
-- imagem            : varchar (URL ou caminho)
-- tags              : array of varchar
-- agendaSemanal     : documento com dias (seg, ter, ..., dom)
--   cada dia contém:
--     horarioFormatado : varchar
--     horaInicio       : integer (timestamp ou minuto do dia)
--     horaFinal        : integer
--     feira            : varchar (nome da feira / id de referência)
-- listaProdutos     : array of varchar (nomes ou ids de produtos)

-- COLLECTION: feiras
-- Campos:
-- _id               : ObjectId (PK)
-- descricao         : varchar
-- imagem            : varchar (URL ou caminho)
-- tags              : array of varchar
-- agendaSemanal     : documento com dias (seg, ter, ..., dom)
--   cada dia contém:
--     horarioFormatado : varchar
--     horaInicio       : integer
--     horaFinal        : integer
-- latitude, longitude: decimal
-- feirantes         : array of document (referência a feirantes ou subdocumentos)
