import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyle = "w-full py-3 font-bold rounded-lg shadow-md transition-all transform active:scale-95 focus:outline-none focus:ring-2";

    // Define style variations
    const variants = {
        primary: "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500",
        secondary: "bg-slate-100 text-gray-600 hover:bg-slate-200 focus:ring-slate-300",
        danger: "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500",
        ghost: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline shadow-none"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;