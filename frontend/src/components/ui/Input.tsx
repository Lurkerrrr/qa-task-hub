import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    required,
    autoComplete,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block mb-1 text-sm font-bold text-slate-700">{label}</label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
                autoComplete={autoComplete}
                {...props}
            />
        </div>
    );
};

export default Input;