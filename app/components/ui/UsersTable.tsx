"use client";

import Image from 'next/image';
import { Table } from "@/app/components/commons";
import { Column } from '../commons/Table';
import { User } from '@/types/types';

interface UsersTableProps {
    users: User[];
    total: number;
    currentPage: number;
}
const UsersTable = ({ users, total, currentPage }: UsersTableProps) => {
    const getRoleStyles = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'owner': return 'bg-amber-50 text-amber-700 border-amber-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const columns: Column<User>[] = [
        {
            header: "Name",
            key: "name",
            render: (user) => (
                <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 shrink-0">
                        {user?.image && (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={64}
                                height={64}
                                className="rounded-full border border-gray-100 object-cover"
                            />
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
            render: (user) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getRoleStyles(user.role)}`}>
                    {user.role}
                </span>
            ),
        },
        {
            header: "Action",
            key: "action",
            align: "right",
            render: () => (
                <button className="font-bold text-brand hover:opacity-70 text-sm">
                    Edit
                </button>
            ),
        },
    ];

    return <Table data={users} columns={columns} total={total} pageSize={10} currentPage={currentPage}/>;
};

export default UsersTable;