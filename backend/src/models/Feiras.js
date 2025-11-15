import mongoose from 'mongoose';

// Definindo o model de feiras
const FeirasSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  descricao: String,
  imagem: String,
  tags: [String],
  agendaSemanal: {
    seg: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    ter: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    qua: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    qui: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    sex: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    sab: {horarioFormatado: String,horaInicio: Number,horaFinal: Number},
    dom: {horarioFormatado: String,horaInicio: Number,horaFinal: Number}
  },
  latitude: Number,
  longitude: Number,
  feirantes: [Object]
});

const Feira = mongoose.model('Feira', FeirasSchema, 'feiras');

export default Feira;
