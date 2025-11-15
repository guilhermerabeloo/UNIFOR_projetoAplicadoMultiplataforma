import mongoose from 'mongoose';

// Definindo o model de feirantes
const FeirantesSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    nome: String,
    imagem: String,
    tags: [String],
    agendaSemanal: {
        seg: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        ter: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        qua: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        qui: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        sex: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        sab: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String},
        dom: {horarioFormatado: String,horaInicio: Number,horaFinal: Number,feira: String}
    },
    listaProdutos: [String]
});

const Feirante = mongoose.model('Feirantes', FeirantesSchema, 'feirantes');

export default Feirante;
