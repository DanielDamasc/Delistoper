import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Rota Inicial (Login) */}
        <Route path="/" element={<Login />} />

        {/* ----- AUTH ----- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Qualquer outra rota redireciona para o login */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* ----- ROTAS PROTEGIDAS ----- */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
