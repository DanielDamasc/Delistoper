import { useState } from "react";
import Input from "../Input/index.jsx";
import Textarea from "../Textarea/index.jsx";
import PrioritySelector from "../PrioritySelector/index.jsx";
import Date from "../Date/index.jsx";
import Button from "../Button/index.jsx";

const CreateTaskModal = ({isOpen, onClose}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {

    }

    // Caso não esteja aberto, não renderiza nada.
    if (!isOpen) {
        return null;
    }

    return (
        // Overlay
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">

            {/* Caixa do modal */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative animate-fade-in-down">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Nova Task</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Título"
                        type="text"
                        placeholder="Ex: feat: Funcionalidade de cadastro de clientes"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <Textarea
                        label="Descrição (Opcional)"
                        type="text"
                        rows="4"
                        placeholder="Detalhes sobre o projeto..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PrioritySelector 
                            value={priority}
                            onChange={setPriority}
                        />

                        <Date 
                            value={dueDate}
                            onChange={setDueDate}
                        />
                    </div>

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

export default CreateTaskModal;