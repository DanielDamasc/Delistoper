import { use, useState } from "react";
import Input from "../Input/index.jsx";
import Textarea from "../Textarea/index.jsx";
import Button from "../Button/index.jsx";
import api from '../../services/api.js';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setIsLoading(true);

        try {
            const response = await api.post('/project/create',{
                name,
                description
            });

            // Passa para o pai adicionar na lista de projetos.
            onProjectCreated(response.data);

            // Limpa as variáveis e fecha o modal.
            setName('');
            setDescription('');
            onClose();

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

    // Caso não esteja aberto, não renderiza nada.
    if (!isOpen) {
        return null;
    }

    return (
        // Overlay
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">

            {/* Caixa do modal */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-down">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Novo Projeto</h1>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome do Projeto"
                        type="text"
                        placeholder="Ex: App Delivery"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Textarea
                        label="Descrição (Opcional)"
                        type="text"
                        rows="4"
                        placeholder="Detalhes sobre o projeto..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-3 items-center">
                        <button type="button" onClick={onClose} 
                            className="w-full py-3 px-4 rounded-lg font-bold
                            text-white bg-gray-600 hover:bg-gray-700
                            flex justify-center items-center"
                        >
                            Cancelar
                        </button>
                        
                        <div className="w-32">
                            <Button type="submit" isLoading={isLoading}>
                                Criar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default CreateProjectModal;