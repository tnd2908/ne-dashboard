import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "outline" | "light" | "default";
    className?: string;
    onClick?: () => void;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    href,
    type = "button",
    disabled = false,
}: ButtonProps) => {
    const baseStyles = "relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 group";

    const variantStyles = {
        primary: "bg-brand text-white shadow-lg shadow-brand/20",
        outline: "bg-transparent border-2 border-brand text-brand hover:text-white",
        light: "bg-brand/10 text-brand hover:bg-brand/20",
        default: "bg-transparent text-gray-600 hover:text-brand px-2",
    };

    const hoverOverlay = (
        <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full" />
    );

    const outlineOverlay = (
        <span className="absolute inset-0 w-0 bg-brand transition-all duration-300 ease-out group-hover:w-full -z-10" />
    );

    const content = (
        <>
            {variant === "outline" ? outlineOverlay : variant !== "default" && hoverOverlay}
            <span className="relative z-10">{children}</span>
        </>
    );

    if (href) {
        const isExternal = href.startsWith("http");
        if (isExternal) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
                    {content}
                </a>
            );
        }
        return (
            <Link href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {content}
        </button>
    );
};

export default Button;