"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Mail, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Input, InputPassword, Button } from '../commons';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>();

    const onSubmit = async (formData: LoginFormValues) => {
        setIsLoading(true);
        setServerError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            localStorage.setItem("token", data.token);
            useAuthStore.getState().setAuth(data.user);

            router.push("/");
            router.refresh();
        } catch (err: unknown) {
            setServerError((err as Error)?.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    icon={Mail}
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                />

                <InputPassword
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                />
            </div>

            {serverError && (
                <div className="text-red-600 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    {serverError}
                </div>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-70 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    "Sign In"
                )}
            </Button>
        </form>
    );
};

export default LoginForm;