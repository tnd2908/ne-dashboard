/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Check, X, Search } from "lucide-react";

interface Option {
    label: string;
    value: any;
    disabled?: boolean;
}

interface MultiSelectProps<T extends Option> {
    options: T[];
    value: any[];
    onChange: (value: any[]) => void;
    placeholder?: string;
    error?: string;
    renderOption?: (option: T) => React.ReactNode;
    renderSelected?: (option: T) => React.ReactNode; // Thêm prop này
    allowSearch?: boolean; // Thêm prop này
}

const MultiSelect = <T extends Option>({
    options,
    value,
    onChange,
    placeholder = "Select options...",
    error,
    renderOption,
    renderSelected,
    allowSearch = false,
}: MultiSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    // Logic filter options dựa trên search term
    const filteredOptions = useMemo(() => {
        return options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    const toggleOption = (val: any) => {
        const newValue = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];
        onChange(newValue);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearchTerm(""); // Reset search khi đóng
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`min-h-[44px] w-full cursor-pointer rounded-xl border bg-white p-2 transition-all ${
                    error ? "border-red-500" : "border-gray-200 focus-within:border-brand"
                }`}
            >
                <div className="flex flex-wrap gap-1.5">
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((opt) => (
                            <div
                                key={opt.value}
                                className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-2 py-1 transition-all hover:bg-gray-200"
                            >
                                {renderSelected ? (
                                    renderSelected(opt)
                                ) : (
                                    <span className="text-xs font-bold text-gray-700">{opt.label}</span>
                                )}
                                <X
                                    className="h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(opt.value);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <span className="py-1 text-sm text-gray-400">{placeholder}</span>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 max-h-72 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl flex flex-col">
                    {allowSearch && (
                        <div className="sticky top-0 border-b border-gray-50 bg-white p-2">
                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <input
                                    autoFocus
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    <div className="overflow-auto p-1 space-y-px">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => !opt.disabled && toggleOption(opt.value)}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                        opt.disabled
                                            ? "opacity-40 cursor-not-allowed bg-gray-50"
                                            : "hover:bg-gray-50 cursor-pointer"
                                    }
                                    ${value.includes(opt.value) ? "bg-brand/5" : ""}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {renderOption ? renderOption(opt) : <span className="font-medium text-gray-900">{opt.label}</span>}
                                    </div>
                                    {value.includes(opt.value) && <Check className="h-4 w-4 text-brand" />}
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-xs text-gray-400">No options found</p>
                        )}
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default MultiSelect;