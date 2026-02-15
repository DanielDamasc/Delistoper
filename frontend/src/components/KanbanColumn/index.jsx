import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard";

const KanbanColumn = ({ title, status, tasks }) => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-100 rounded-xl border border-gray-200 border-t-4 border-t-indigo-600 shadow-sm">

            <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="font-bold text-gray-700 uppercase tracking-wide text-sm">{title}</h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
                    {tasks.length}
                </span>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-3 flex-1 overflow-y-auto min-h-[150px] flex flex-col gap-3
                            ${snapshot.isDraggingOver ? 'bg-indigo-50/50' : ''}`}>

                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}

                        {/* Placeholder cria o espaço vazio para o card cair. */}
                        {provided.placeholder}

                        {tasks.length === 0 && !snapshot.isDraggingOver && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
                                No tasks.
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default KanbanColumn;