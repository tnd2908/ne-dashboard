"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <div
                className={`fixed inset-0 h-screen z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drawer;