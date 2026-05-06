"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
    ChevronRight,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { menuItems } from "@/mock/links";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });

            logout();

            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside
            className={`
                bg-white border-gray-200 flex flex-col z-20
                transition-all duration-300 ease-in-out

                md:sticky md:top-0 md:h-dvh md:border-r
                fixed bottom-0 left-0 right-0 h-20 border-t

                ${isCollapsed ? "md:w-20" : "md:w-64"}
            `}
        >
            {/* ========================= */}
            {/* Desktop Logo */}
            {/* ========================= */}
            <div className="hidden md:block py-4 px-3 border-b border-gray-200">
                <Image
                    className="block h-8 w-auto"
                    loading="eager"
                    src="/logo.svg"
                    alt="Logo"
                    width={100}
                    height={50}
                />
            </div>

            {/* ========================= */}
            {/* Desktop Menu */}
            {/* ========================= */}
            <nav className="hidden md:block flex-1 px-3 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center rounded-xl
                                transition-all duration-200
                                group relative

                                ${isCollapsed
                                    ? "justify-center p-3"
                                    : "justify-between px-3 py-2.5"
                                }

                                ${isActive
                                    ? "bg-brand/10 text-brand"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon
                                    className={`
                                        h-5 w-5 shrink-0
                                        ${isActive
                                            ? "text-brand"
                                            : "text-gray-400 group-hover:text-gray-600"
                                        }
                                    `}
                                />

                                {!isCollapsed && (
                                    <span className="text-sm font-semibold whitespace-nowrap">
                                        {item.label}
                                    </span>
                                )}
                            </div>

                            {!isCollapsed && isActive && (
                                <ChevronRight className="h-4 w-4" />
                            )}

                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ========================= */}
            {/* Mobile Bottom Navigation */}
            {/* ========================= */}
            <nav className="md:hidden flex items-center justify-around h-full px-2 bg-white/95 backdrop-blur-md">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-1 items-center justify-center"
                        >
                            <div
                                className={`
                                    relative flex flex-col items-center justify-center
                                    rounded-2xl px-3 py-2
                                    transition-all duration-200
                                    min-w-[64px]

                                    ${isActive
                                        ? "bg-brand/10"
                                        : "active:scale-95"
                                    }
                                `}
                            >
                                {isActive && (
                                    <div className="absolute -top-2 h-1 w-8 rounded-full bg-brand" />
                                )}

                                <item.icon
                                    className={`
                                        h-5 w-5 mb-1 transition-colors

                                        ${isActive
                                            ? "text-brand"
                                            : "text-zinc-400"
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        text-[11px] font-medium leading-none

                                        ${isActive
                                            ? "text-brand"
                                            : "text-zinc-500"
                                        }
                                    `}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* ========================= */}
            {/* Desktop Footer */}
            {/* ========================= */}
            <div className="hidden md:block p-3 border-t border-gray-100 space-y-2">
                <button
                    onClick={handleLogout}
                    className={`
                        flex cursor-pointer items-center gap-3 rounded-xl
                        transition-all w-full group relative

                        text-gray-500 hover:text-red-600 hover:bg-red-50

                        ${isCollapsed
                            ? "justify-center p-3"
                            : "px-3 py-2.5 text-sm font-semibold"
                        }
                    `}
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
                    className={`
                        flex items-center gap-3 rounded-xl
                        transition-all w-full

                        text-gray-400 hover:text-brand hover:bg-gray-50

                        ${isCollapsed
                            ? "justify-center p-3"
                            : "px-3 py-2.5 text-sm font-semibold"
                        }
                    `}
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="h-5 w-5" />
                    ) : (
                        <PanelLeftClose className="h-5 w-5" />
                    )}

                    {!isCollapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;