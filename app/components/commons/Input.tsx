import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon: Icon, className = "", ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="block text-sm font-semibold text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Icon className="h-4.5 w-4.5 text-gray-400" />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              block w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm 
              focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white 
              outline-none transition-all placeholder:text-gray-400 disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${Icon ? "pl-11" : "px-4"}
              ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs font-medium text-red-600 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-600" />
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;