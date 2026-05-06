import Image from "next/image";
import { Project } from "@/types/types";
import Link from "next/link";

interface ProjectGridProps {
    projects: Project[];
    columns: number;
}

const ProjectGrid = ({ projects, columns }: ProjectGridProps) => {
    const gridCols: Record<number, string> = {
        2: "grid-cols-1 md:grid-cols-2 gap-4",
        3: "grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3",
        5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2",
    };

    return (
        <div className={`grid ${gridCols[columns] || gridCols[3]}`}>
            {projects.map((project) => (
                <Link href={`/projects/edit/${project.id}`} key={project.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-gray-100">
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                            {project.category}
                        </span>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{project.name}</h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{project.startDate}</span>
                            <span className="font-bold text-gray-700">{project.duration}</span>
                        </div>
                        <div className="pt-2">
                            <div className="h-1.5 w-full rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-brand"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectGrid;