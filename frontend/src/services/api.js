import axios from 'axios';

// Instância do Axios.
const api = axios.create({
  baseURL: 'https://localhost:3000', // URL do NestJS.
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
    },
});

// Interceptor para verificar se tem token salvo.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera o token salvo.

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona token no header da requisição.
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para a resposta, caso retorne requisição não autorizada.
api.interceptors.response.use(
    (response) => {
        return response; // Retorna os dados se tudo deu certo.
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Remove o token por segurança.
            console.log('Sessão expirada ou credenciais inválidas.');
        }
        return Promise.reject(error);
    }
);

export default api;