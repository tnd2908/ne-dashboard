"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageClick = (page: number) => {
        if (page < 1 || page > totalPages) return;
        
        if (onPageChange) {
            onPageChange(page);
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + 2);

            if (currentPage <= 2) {
                start = 1;
                end = 3;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 2;
                end = totalPages;
            }

            if (start > 1) pages.push(1);
            if (start > 2) pages.push('ellipsis');
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) pages.push('ellipsis');
            if (end < totalPages) pages.push(totalPages);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <div className="hidden sm:block text-sm text-gray-500 font-medium">
                Showing page <span className="text-gray-900 font-bold">{currentPage}</span> of{" "}
                <span className="text-gray-900 font-bold">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => {
                        if (page === 'ellipsis') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-2">
                                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                </span>
                            );
                        }

                        const isCurrent = page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageClick(page as number)}
                                className={`min-w-[36px] h-9 rounded-lg text-sm font-bold transition-all ${
                                    isCurrent
                                        ? "bg-brand text-white shadow-md shadow-brand/20"
                                        : "text-gray-600 hover:bg-gray-100 border border-transparent"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;