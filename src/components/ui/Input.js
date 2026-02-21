import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    required,
    autoComplete,
    className = '',
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
            />
        </div>
    );
};

export default Input;
