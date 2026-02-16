import { Draggable } from "@hello-pangea/dnd";
import { Calendar, Trash2 } from "lucide-react";

const TaskCard = ({ task, index, onDelete }) => {

    // Estilos do status.
    const priorityStyles = {
        LOW: { color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Baixa' },
        MEDIUM: { color: 'text-amber-600', bg: 'bg-amber-100', label: 'Média' },
        HIGH: { color: 'text-rose-600', bg: 'bg-rose-100', label: 'Alta' },
    };

    const handleTaskDelete = (e) => {
        // Impede que clicar no botão ative o drag and drop.
        e.stopPropagation();

        // Chama a onDelete do pai.
        onDelete(task.id);
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} // Diz que o card inteiro pode ser puxado.

                    className={`relative bg-white p-4 rounded-lg border border-gray-200 transition-all group
                        ${snapshot.isDragging ? 'shadow-xl scale-105 rotate-2 z-50' : 'shadow-sm hover:shadow hover:border-indigo-300'}`}
                    style={provided.draggableProps.style}
                >
                    
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1
                            ${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].color}`}>
                                {priorityStyles[task.priority].label}
                        </span>

                        <button
                            onClick={handleTaskDelete}
                            
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}

                            className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
                            title="Deletar tarefa"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>

                    <h4 className="font-semibold text-gray-800 text-sm mb-1 leading-snug">
                        {task.title}
                    </h4>
                    {task.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                            {task.description}
                        </p>
                    )}

                    {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 font-normal mt-3 pt-3 border-t border-gray-50">
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;