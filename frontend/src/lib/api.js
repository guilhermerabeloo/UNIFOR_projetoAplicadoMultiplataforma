import axios from 'axios';

// Configura o objeto axios que sera a ponte entre o frontend e o backend
export const api = axios.create({
    baseURL: 'http://localhost:3000'
})