import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { CircleArrowLeft, Trash2 } from "lucide-react"
import { useEffect, useState } from "react";
import api from "../services/api";
import CreateTaskModal from "../components/Modals/CreateTaskModal";
import CreateButton from "../components/CreateButton";
import KanbanColumn from "../components/KanbanColumn";
import { DragDropContext } from '@hello-pangea/dnd';
import DeleteProjectModal from "../components/Modals/DeleteProjectModal";

const Project = () => {
    const { id } = useParams(); // Pega o ID da URL.
    const location = useLocation(); // Pega o objeto passado no Link.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(!location.state?.projectData);

    // Pega os dados do projeto passados no state. 
    // Isso funciona até o momento que o usuário der f5 ou caso ele venha direto para este link.
    // Caso ele dê f5, os dados devem ser buscados no backend.
    const [project, setProject] = useState(location.state?.projectData || null)

    const [tasks, setTasks] = useState([]);

    const handleNewTask = (taskData) => {
        setTasks((prevTasks) => [taskData, ...prevTasks]);
    }

    const navigate = useNavigate();

    useEffect(() => {        
        const getProject = async () => {
            
            // Se não vier através da home, ativa o carregamento visual do projeto.
            if (!project) {
                setIsLoading(true);
            }

            try {
                const response = await api.get(`/project/${id}`, {});

                setProject(response.data);

                // As tasks estão sendo buscadas como relation desta requisição.
                setTasks(response.data.tasks || []);

            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false);

            }
        }

        getProject();
    }, [id]);

    // Função ao soltar o card.
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // Se soltou fora da coluna não faz nada
        if (!destination) {
            return ;
        }

        // Se soltou no mesmo lugar que pegou não faz nada
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return ;
        }

        // Se mudou de coluna do kanban
        if (destination.droppableId !== source.droppableId) {
            const taskId = parseInt(draggableId); // Id da tarefa que foi arrastada.
            const newStatus = destination.droppableId; // Id da coluna de destino.

            // Atualiza visualmente na hora.
            setTasks((prevTasks) => {
                return prevTasks.map((task) => {
                    return task.id === taskId ? { ...task, status: newStatus } : task
                });
            });

            // Salva no backend...
            try {
                await api.patch(`/task/${taskId}`, { status: newStatus });
            } catch (error) {
                console.log("Erro ao mover tarefa", error);
            }
        }
    }

    const handleTaskDelete = async (taskId) => {
        try {
            await api.delete(`task/${taskId}`);

            // Muda o estado na hora, mantendo somente os de ID diferente.
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6">
                    <Link 
                        to="/home" 
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        <CircleArrowLeft size={16} className="mr-1" />
                        Voltar para Home
                    </Link>
                </div>

                {isLoading && (
                    <div className="text-center py-10 text-gray-500">Loading...</div>
                )}

                {!isLoading && project && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            
                            {/* Ícone Grande com a Inicial */}
                            <div className="shrink-0 hidden md:block">
                                <div className="w-16 h-16 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                                    {project.name.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            {/* Conteúdo Principal */}
                            <div className="flex-1 w-full">

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                    {/* Titulo + ID */}
                                    <div className="flex-1 w-full">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
                                            {project.name}
                                        </h1>
                                    </div>

                                    <div className="flex flex-row gap-3 w-full sm:w-auto shrink-0 mt-1 sm:mt-0">

                                        <div className="flex-1 sm:flex-none">
                                            <CreateButton 
                                                children={'Task'}
                                                onClick={() => setIsModalOpen(true)}
                                            />
                                        </div>

                                        <button
                                            className="flex items-center justify-center
                                                text-red-500 bg-white border border-red-200 
                                                hover:border-red-500 hover:bg-red-50 hover:text-red-600
                                                text-sm md:text-base px-4 py-2 sm:p-2
                                                rounded-lg transition-all 
                                                active:scale-95 shrink-0"
                                            onClick={() => setIsDeleteOpen(true)}
                                        >
                                            <Trash2 size={20} />
                                        </button>

                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-md md:text-lg leading-relaxed">
                                    {project.description || (
                                        <span className="text-gray-400 italic text-md md:text-lg">Nenhuma descrição fornecida.</span>
                                    )}
                                </p>
                            </div>

                        </div>
                    </div>
                )}

                {!isLoading && project && (
                    <div className="mt-8 pb-4">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                <KanbanColumn 
                                    title="A fazer"
                                    status="TODO"
                                    tasks={tasks.filter(t => t.status === 'TODO')}
                                    onDelete={handleTaskDelete}
                                    />

                                <KanbanColumn 
                                    title="Em andamento"
                                    status="IN_PROGRESS"
                                    tasks={tasks.filter(t => t.status === 'IN_PROGRESS')}
                                    onDelete={handleTaskDelete}
                                    />

                                <KanbanColumn 
                                    title="Concluído"
                                    status="DONE"
                                    tasks={tasks.filter(t => t.status === 'DONE')}
                                    onDelete={handleTaskDelete}
                                    />

                            </div>
                        </DragDropContext>
                    </div>
                )}

                {!isLoading && !project && (
                    <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">Project not found.</p>
                    </div>
                )}
                
            </main>

            <CreateTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskCreated={handleNewTask}
                projectId={id}
            />

            <DeleteProjectModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                projectId={id}
                onSuccess={() => navigate('/home')}
            />
        </div>
    );
}

export default Project;