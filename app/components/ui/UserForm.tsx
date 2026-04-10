"use client";

import { Button, Input } from "@/app/components/commons";
import { User } from "@/types/types";
import { redirect, RedirectType } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


interface UserFormProps {
    initialData?: Partial<User>;
    isLoading?: boolean;
}

const UserForm = ({ initialData, isLoading }: UserFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>({
        defaultValues: initialData || {
            name: "",
            email: "",
            title: "",
            department: "",
            role: "member",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                name: "",
                email: "",
                title: "",
                department: "",
                role: "member",
            });
        }
    }, [initialData, reset]);

    const onSubmit = () => {
        redirect('/users', RedirectType.push);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Full Name
                    </label>
                    <Input
                        {...register("name", { required: "Name is required" })}
                        placeholder="e.g. John Doe"
                        error={errors.name?.message}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Email Address
                    </label>
                    <Input
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                        })}
                        disabled={!!initialData}
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Job Title
                        </label>
                        <Input
                            {...register("title", { required: "Title is required" })}
                            placeholder="Software Developer"
                            error={errors.title?.message}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            {...register("role")}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 bg-white"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                            <option value="owner">Owner</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : !initialData ? "Add Member" : "Update Profile"}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;