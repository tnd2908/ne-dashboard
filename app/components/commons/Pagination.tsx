"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        if (onPageChange) {
            onPageChange(page);
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    const canPrevious = currentPage > 1;
    const canNext = currentPage < totalPages;

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <div className="text-sm text-gray-500 font-medium">
                Page <span className="text-gray-900 font-bold">{currentPage}</span> of{" "}
                <span className="text-gray-900 font-bold">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={!canPrevious}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>

                <div className="flex items-center gap-1">
                    <span className="px-3 py-1 text-sm font-bold text-brand bg-brand/5 rounded-lg border border-brand/10">
                        {currentPage}
                    </span>
                </div>

                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={!canNext}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
