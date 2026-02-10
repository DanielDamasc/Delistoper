import React from 'react';
import { useState } from 'react';
import Button from '../components/Button/index.jsx';
import Input from '../components/Input/index.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Estados para controlar as variáveis.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate(); // hook de navegação entre páginas.

    return (
    // Container principal: Centraliza tudo na tela (h-screen = altura total)
    <div className="min-h-screen flex items-center justify-center px-4">
      
      {/* Card de Login */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-gray-900">Acesse sua conta</h1>
          <p className="text-sm text-gray-600 mt-2">
            Digite suas credenciais para continuar
          </p>
        </div>

        {/* Formulário */}
        <form>

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
          <div className="mt-6">
            <Button type="submit" isLoading={isLoading}>
              ENTRAR
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;