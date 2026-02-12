import React, { useState } from 'react';
import Button from '../components/Button/index.jsx';
import Input from '../components/Input/index.jsx';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import api from '../services/api.js';

const Register = () => {
    // Estados para controlar as variáveis.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault(); // Evita que a página recarregue.
      setError(''); // Limpa erros antigos.

      if (password !== confirmPassword) {
        setError('As senhas não correspondem.');
        return ;
      }

      if (password.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
        return ;
      }

      setIsLoading(true);

      try {
        await api.post('/auth/register', {
          name,
          email,
          password
        });

        navigate('/');

      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Erro ao criar a conta. Tente novamente mais tarde.');
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

        {/* Card de Registro */}
        <div className="max-w-lg w-full p-8">
          
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 text-start mb-4">Crie sua conta</h1>
            <p className="text-sm text-gray-600 mt-2 text-start">
              Digite seus dados para começar
            </p>
          </div>

          {/* Formulário */}
          <form className='mb-4' onSubmit={handleSubmit}>

            {/* Exibição de Erros */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <Input
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <Input
              label="Confirme sua Senha"
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {/* Botão com estado de carregamento */}
            <div className="mt-6">
              <Button type="submit" isLoading={isLoading}>
                Registrar
              </Button>
            </div>

          </form>

          <div className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link 
              to="/" 
              className="text-blue-500 font-semibold hover:underline"
            >
              Log in
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

export default Register;