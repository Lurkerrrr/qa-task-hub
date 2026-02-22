import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: (string | SelectOption)[];
}

const Select: React.FC<SelectProps> = ({
    label,
    name,
    value,
    onChange,
    options = [],
    className = '',
    ...props
}) => {
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
                {...props}
            >
                {options.map((opt, index) => {
                    const val = typeof opt === 'string' ? opt : opt.value;
                    const lab = typeof opt === 'string' ? opt : opt.label;

                    return (
                        <option key={index} value={val}>
                            {lab}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Select;