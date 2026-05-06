"use client";

import { Table } from "@/app/components/commons";
import { User } from '@/types/types';
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useCallback, useMemo } from 'react'; // Thêm useCallback
import { Column } from '../commons/Table';
import { useAuthStore } from '@/store/useAuthStore';

interface UsersTableProps {
    users: User[];
    total: number;
    currentPage: number;
}

const ROLE_CONFIG: Record<string, string> = {
    admin: 'bg-purple-50 text-purple-700 border-purple-100',
    owner: 'bg-amber-50 text-amber-700 border-amber-100',
    default: 'bg-gray-50 text-gray-600 border-gray-100'
};

const UsersTable = ({ users, total, currentPage }: UsersTableProps) => {
    const currentUser = useAuthStore((state) => state.user);
    
    const handleDeleteClick = useCallback((user: User) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);
        if (confirmDelete) {
            console.log("Deleting user:", user.id);
        }
    }, []);

    const columns = useMemo<Column<User>[]>(() => [
        {
            header: "Name",
            key: "name",
            render: (user) => (
                <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                                priority={currentPage === 1}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-gray-900 truncate">{user.name}</div>
                        <div className="text-gray-500 text-[11px] truncate">{user.email}</div>
                    </div>
                </div>
            ),
        },
        {
            header: "Title",
            key: "title",
            render: (user) => (
                <div>
                    <div className="font-medium text-gray-900 text-sm">{user.title}</div>
                    <div className="text-gray-400 text-[11px]">{user.department}</div>
                </div>
            ),
        },
        {
            header: "Access Level",
            key: "role",
            render: (user) => {
                const roleKey = user.role.toLowerCase();
                const style = ROLE_CONFIG[roleKey] || ROLE_CONFIG.default;
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${style}`}>
                        {user.role}
                    </span>
                );
            },
        },
        {
            header: "Action",
            key: "action",
            align: "right",
            render: (user) => (
                <div className="flex gap-2 justify-end">
                    <Link
                        href={`/users/${user.id}`}
                        className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-brand hover:border-brand transition-all bg-white shadow-sm"
                    >
                        <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                        href={`/users/edit/${user.id}`}
                        className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-brand hover:border-brand transition-all bg-white shadow-sm"
                    >
                        <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                        disabled={user.id === currentUser?.id}
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 disabled:hidden disabled:opacity-50 disabled:hover:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all bg-white shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ], [currentPage, handleDeleteClick]);

    return (
        <>
            <Table
                data={users}
                columns={columns}
                total={total}
                pageSize={10}
                currentPage={currentPage}
            />
        </>
    );
};

export default UsersTable;