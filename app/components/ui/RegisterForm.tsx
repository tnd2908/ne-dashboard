"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Mail, Loader2, User, ArrowRight } from 'lucide-react';
import { Input, InputPassword } from '../commons';
import { useState } from 'react';

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterFormValues>();

    const password = watch("password");

    const onSubmit = async (formData: RegisterFormValues) => {
        setIsLoading(true);
        setServerError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            router.push("/login");
        } catch (err: unknown) {
            setServerError((err as Error)?.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    icon={User}
                    error={errors.name?.message}
                    {...register("name", { required: "Full name is required" })}
                />

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

                <InputPassword
                    label="Confirm Password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === password || "Passwords do not match"
                    })}
                />
            </div>

            {serverError && (
                <div className="text-red-600 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    {serverError}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-70 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </form>
    );
};

export default RegisterForm;