"use client";

import { useForm, Controller } from "react-hook-form";
import { ImageUpload, MultiSelect } from "@/app/components/commons";
import Image from "next/image";
import { Project, User } from "@/types/types";

const CATEGORY_OPTIONS = [
    { label: "Web Development", value: "Web Development" },
    { label: "Mobile App", value: "Mobile App" },
    { label: "Design", value: "Design" },
    { label: "Infrastructure", value: "Infrastructure" },
];

const STATUS_OPTIONS = [
    { label: "Planning", value: "Planning" },
    { label: "Active", value: "Active" },
    { label: "On Hold", value: "On Hold" },
    { label: "Completed", value: "Completed" },
];

interface FormProps {
    users: User[];
    initialData?: Partial<Project>;
}

const ProjectForm = ({ users, initialData }: FormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Project>({
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            startDate: initialData?.startDate || "",
            duration: initialData?.duration || "",
            category: initialData?.category || "",
            status: initialData?.status || "Planning",
            users: initialData?.users || [],
            image: initialData?.image || "",
        },
    });

    const userOptions = users.map((user) => ({
        label: user.name,
        value: user.id,
        image: user.image,
        title: user.title,
    }));

    const onSubmit = (data: Project) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Project Name</label>
                <input
                    {...register("name", { required: "Please enter the project name" })}
                    className={`w-full rounded-xl border p-3 text-sm outline-none transition-all ${errors.name ? "border-red-500" : "border-gray-200 focus:border-brand"
                        }`}
                    placeholder="Enter project name..."
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Category</label>
                    <select
                        {...register("category", { required: "Please select a category" })}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-brand bg-white"
                    >
                        <option value="">Select category</option>
                        {CATEGORY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Status</label>
                    <select
                        {...register("status")}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-brand bg-white"
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Start Date</label>
                    <input
                        type="date"
                        {...register("startDate", { required: "Please select a start date" })}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-brand"
                    />
                    {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Duration</label>
                    <input
                        {...register("duration", { required: "Please enter expected duration" })}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-brand"
                        placeholder="e.g., 3 months"
                    />
                    {errors.duration && <p className="text-xs text-red-500">{errors.duration.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Team Members</label>
                <Controller
                    name="users"
                    control={control}
                    rules={{ validate: (val) => val.length > 0 || "Please select at least one member" }}
                    render={({ field }) => (
                        <MultiSelect
                            options={userOptions}
                            value={field.value} // field.value sẽ chứa mảng ID từ initialData.users
                            onChange={field.onChange}
                            error={errors.users?.message}
                            placeholder="Select team members..."
                            renderOption={(opt) => (
                                <div className="flex items-center gap-3">
                                    <Image width={32} height={32} src={opt.image} className="h-7 w-7 rounded-full object-cover" alt="" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">{opt.label}</span>
                                        <span className="text-[10px] text-gray-400">{opt.title}</span>
                                    </div>
                                </div>
                            )}
                            renderSelected={(opt) => (
                                <div className="flex items-center gap-1.5">
                                    <Image width={16} height={16} src={opt.image} className="h-5 w-5 rounded-full object-cover" alt="" />
                                    <span className="text-xs font-bold text-gray-700">{opt.label}</span>
                                </div>
                            )}
                        />
                    )}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Project Cover</label>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <ImageUpload
                            value={initialData?.image}
                            onChange={(file) => field.onChange(file)}
                        />
                    )}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-brand resize-none"
                    placeholder="Enter project description..."
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-2 rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand/90 active:scale-[0.98] transition-all"
                >
                    {initialData ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;