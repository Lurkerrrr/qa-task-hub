import React from 'react';

const Select = ({ label, name, value, onChange, options = [], className = '' }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block mb-1 text-sm font-bold text-slate-700">{label}</label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
                {options.map((opt, index) => (
                    <option key={index} value={opt.value || opt}>
                        {opt.label || opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
