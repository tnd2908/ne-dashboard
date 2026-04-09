/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode } from 'react';
import Pagination from './Pagination';

export interface Column<T> {
    header: string;
    key: string;
    render?: (item: T) => ReactNode;
    align?: "left" | "right" | "center";
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    currentPage?: number;
    pageSize?: number;
    total?: number;
    onPageChange?: (page: number) => void;
}

function Table<T extends { id: string | number }>({
    data,
    columns,
    onRowClick,
    currentPage,
    pageSize,
    total,
    onPageChange
}: TableProps<T>) {
    const totalPages = total && pageSize ? Math.ceil(total / pageSize) : 0;

    return (
        <div className="w-full overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                                        }`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    onClick={() => onRowClick?.(item)}
                                    className={`transition-colors group ${onRowClick ? "cursor-pointer hover:bg-gray-50" : "hover:bg-gray-50/50"}`}
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={`${item.id}-${col.key}`}
                                            className={`px-6 py-4 whitespace-nowrap text-sm ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                                                }`}
                                        >
                                            {col.render ? col.render(item) : (item as any)[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 italic">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 0 && currentPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}

export default Table;