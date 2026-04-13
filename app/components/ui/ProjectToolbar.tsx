"use client";

import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import { Project } from "@/types/types";

interface ProjectToolbarProps {
    projects: Project[];
}
const ProjectToolbar = ({ projects }: ProjectToolbarProps) => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [columns, setColumns] = useState(3);
    return (
        <div className="space-y-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                        onClick={() => setView("grid")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "grid" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <LayoutGrid className="w-4 h-4" /> Grid
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "list" ? "bg-white text-brand shadow-sm" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <List className="w-4 h-4" /> List
                    </button>
                </div>

                {view === "grid" && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 font-medium">Columns:</span>
                        <div className="flex gap-1 bg-white border border-gray-200 p-1 rounded-xl">
                            {[2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setColumns(num)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${columns === num ? "bg-brand text-white" : "text-gray-400 hover:bg-gray-50"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {view === "grid" ? (
                <ProjectGrid projects={projects} columns={columns} />
            ) : (
                <ProjectList projects={projects} />
            )}
        </div>
    );
};

export default ProjectToolbar;