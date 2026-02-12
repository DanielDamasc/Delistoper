import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    // Tenta pegar o token.
    const token = localStorage.getItem('token');

    // Se tem token, renderiza as rotas filhas.
    // Se não tem token, volta para o login.
    return (
        token ? <Outlet /> : <Navigate to="/" replace />
    );
}

export default PrivateRoutes;