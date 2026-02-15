import { useState } from "react";
import DeleteButton from "../DeleteButton";
import api from '../../services/api.js';

const DeleteProjectModal = ({isOpen, onClose, projectId, onSuccess}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setError('');

        setIsLoading(true);

        try {
            const response = await api.delete(`/project/${projectId}`,{});

            // Navega para a home em caso de sucesso.
            onSuccess();

        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao criar projeto. Tente mais tarde.');
            }
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        // Overlay
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">

            {/* Caixa do modal */}
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-down">
                <h1 className="text-xl font-bold mb-4 text-gray-800">
                    Tem certeza que deseja deletar o projeto?
                </h1>
                <p className="text-md font-normal mb-4 text-gray-600">
                    Atenção, ao deletar este projeto você perderá todas as tarefas vinculadas, esta ação não pode ser revertida.
                </p>

                <form onSubmit={handleDelete} className="space-y-4">
                    <div className="flex justify-center items-center gap-3">
                        <button type="button" onClick={onClose} 
                            className="w-full py-3 px-4 rounded-lg font-bold
                            text-white bg-gray-600 hover:bg-gray-700
                            flex justify-center items-center"
                        >
                            Cancelar
                        </button>
                        
                        <div className="w-32">
                            <DeleteButton type="submit" isLoading={isLoading}>
                                Deletar
                            </DeleteButton>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default DeleteProjectModal;