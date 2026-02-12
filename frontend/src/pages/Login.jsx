import React, { useState } from 'react';
import Button from '../components/Button/index.jsx';
import Input from '../components/Input/index.jsx';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import api from '../services/api.js';

const Login = () => {
    // Estados para controlar as variáveis.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault(); // Evita que a página recarregue.
      setError(''); // Limpa erros antigos.

      if (password.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
        return ;
      }

      setIsLoading(true);

      try {
        const response = await api.post('/auth/login', {
          email,
          password
        });

        // Extrai os dados de retorno do login.
        const { access_token, user } = response.data;

        // Salva o token.
        if (access_token) {
          // Salva o token no local storage.
          localStorage.setItem('token', access_token);

          // Salva o usuário também para exibir na home.
          localStorage.setItem('user', JSON.stringify(user));

          // Configura o token no axios.
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

          navigate('/home');
        }

      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Erro ao fazer login. Tente novamente mais tarde.');
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    return (
    // Container principal: Centraliza tudo na tela (h-screen = altura total)
    <div className="min-h-screen flex">

      {/* Metade Esquerda */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-4 py-12">

        {/* Card de Login */}
        <div className="max-w-lg w-full p-8">
          
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 text-start mb-4">Acesse sua conta</h1>
            <p className="text-sm text-gray-600 mt-2 text-start">
              Digite suas credenciais para continuar
            </p>
          </div>

          {/* Formulário */}
          <form className='mb-16' onSubmit={handleSubmit}>

            {/* Exibição de Erros */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <Input
              label="E-mail"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Botão com estado de carregamento */}
            <div className="mt-6 max-w-32">
              <Button type="submit" isLoading={isLoading}>
                Entrar
              </Button>
            </div>

          </form>

          <div className="text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <Link 
              to="/register" 
              className="text-blue-500 font-semibold hover:underline"
            >
              Criar Conta
            </Link>
          </div>
          
        </div>

      </div>

      {/* Metade Direita (Imagem) */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={loginImg} 
          alt="Imagem de fundo do login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

    </div>
  );
}

export default Login;