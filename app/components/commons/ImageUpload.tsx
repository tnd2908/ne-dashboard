"use client";

import React, { useState, useRef } from "react";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    onChange: (file: File | null) => void;
    value?: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | undefined>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange(file);
        }
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(undefined);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onChange(null);
    };

    return (
        <div
            onClick={() => fileInputRef.current?.click()}
            className={
                `group relative flex aspect-square w-full max-w-[200px] overflow-hidden cursor-pointer flex-col items-center justify-center rounded-2xl ${!preview ? 'border-2 border-dashed' : 'border'} border-gray-300 bg-gray-50 transition-all hover:bg-brand/5`
            }
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {preview ? (
                <div className="relative h-full group w-full overflow-hidden p-2">
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="rounded-lg object-cover"
                    />
                    <div className="absolute opacity-0 duration-300 group-hover:opacity-100 inset-0 bg-black/50">
                        <button
                            onClick={removeImage}
                            className="absolute right-3 top-3 rounded-full p-1 text-white shadow-md transition-transform"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-brand">
                    <div className="rounded-full bg-white p-3 shadow-sm transition-transform">
                        <Upload size={24} />
                    </div>
                    <span className="text-sm font-bold">Upload</span>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;