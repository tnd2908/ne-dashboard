"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Bell, User } from "lucide-react";

const Header = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end h-16 items-center">
                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-gray-600 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="h-8 w-px bg-gray-200" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-900 leading-none">
                                    {user?.name || "Guest"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                                    {user?.role || "Developer"}
                                </p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand border border-brand/20 shadow-sm shadow-brand/5">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;