const Button = ({children, isLoading, ...rest }) => {
    return (
        <button
            className={`
                w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg
                hover:bg-blue-700 transition duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                flex justify-center items-center
            `}
            disabled={isLoading}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;