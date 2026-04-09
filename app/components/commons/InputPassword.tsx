import React, { useState, forwardRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Input from "./Input";

interface InputPasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ label, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    label={label}
                    error={error}
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    className="pr-11"
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`
            absolute right-3 flex items-center text-gray-400 hover:text-brand transition-colors
            ${label ? "top-[38px]" : "top-1/2 -translate-y-1/2"}
          `}
                >
                    {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                        <Eye className="h-4.5 w-4.5" />
                    )}
                </button>
            </div>
        );
    }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;