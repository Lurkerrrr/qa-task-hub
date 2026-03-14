import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    type = 'text',
    className = '',
    error,
    ...props
}, ref) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block mb-1 text-sm font-bold text-slate-700">{label}</label>
            )}
            <input
                ref={ref}
                type={type}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                {...props}
            />
            {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;