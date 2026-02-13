import { Plus } from "lucide-react";

const CreateButton = ({ children, ...rest }) => {
    return (
        <button
            {...rest}
            className="
            flex items-center 
            gap-1.5 md:gap-2
            bg-indigo-600 hover:bg-indigo-700 text-white 
            px-3 py-1.5 md:px-4 md:py-2
            text-sm md:text-base
            rounded-lg font-medium 
            transition-all shadow-sm hover:shadow-md
            active:scale-95
            "
        >
            <Plus size={20} />
            {children}
        </button>
    );
}

export default CreateButton;