"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Folder,
    Users,
    Settings,
    LogOut,
    Code2,
    ChevronRight,
    ChevronLeft,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/" },
        { label: "Projects", icon: Folder, href: "/projects" },
        { label: "Team", icon: Users, href: "/team" },
        { label: "Developer Tools", icon: Code2, href: "/tools" },
        { label: "Settings", icon: Settings, href: "/settings" },
    ];

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            logout();
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside
            className={`bg-white border-r border-gray-200 flex flex-col sticky left-0 top-0 h-dvh z-20 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="py-4 px-2 border-b border-gray-200">
                <Image className='block h-8' src="/logo.svg" alt="StudyDash" width={100} height={50} />
            </div>

            <nav className="flex-1 px-3 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-xl transition-all duration-200 group relative ${isCollapsed ? "justify-center p-3" : "justify-between px-3 py-2.5"
                                } ${isActive
                                    ? "bg-brand/10 text-brand"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-brand" : "text-gray-400 group-hover:text-gray-600"}`} />
                                {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>}
                            </div>

                            {!isCollapsed && isActive && <ChevronRight className="h-4 w-4" />}

                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-gray-100 space-y-2">
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 rounded-xl transition-all text-gray-500 hover:text-red-600 hover:bg-red-50 w-full group relative ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5 text-sm font-semibold"
                        }`}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>Sign Out</span>}

                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            Sign Out
                        </div>
                    )}
                </button>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`flex items-center gap-3 rounded-xl transition-all text-gray-400 hover:text-brand hover:bg-gray-50 w-full ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5 text-sm font-semibold"
                        }`}
                >
                    {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    {!isCollapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;