import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        success: 'bg-green-100 text-green-800 border-green-200',
        danger: 'bg-red-100 text-red-800 border-red-200',
        warning: 'bg-orange-100 text-orange-800 border-orange-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        default: 'bg-slate-100 text-slate-800 border-slate-200'
    };

    return (
        <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded-md border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;