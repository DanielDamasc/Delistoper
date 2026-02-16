import { Plus } from "lucide-react";

const CreateButton = ({ children, ...rest }) => {
    return (
        <button
            {...rest}
            className="flex items-center justify-center gap-1.5
            text-indigo-600 bg-white border border-indigo-200 
            hover:border-indigo-600 hover:bg-indigo-50 
            font-medium text-sm md:text-base px-3 py-2 
            rounded-lg transition-all 
            active:scale-95"
        >
            <Plus size={20} />
            {children}
        </button>
    );
}

export default CreateButton;