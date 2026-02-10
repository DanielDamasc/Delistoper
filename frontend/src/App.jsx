import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Rota Inicial (Login) */}
        <Route path="/" element={<Login />} />

        {/* Qualquer outra rota redireciona para o login */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
