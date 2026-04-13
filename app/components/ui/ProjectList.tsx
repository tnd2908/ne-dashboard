import { Project } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const ProjectList = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <Link href={`/projects/edit/${project.id}`} key={project.id} className="flex flex-col md:flex-row gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="relative h-40 md:aspect-video shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image src={project.image} alt={project.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900">{project.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                            </div>
                            <span className={`h-fit rounded-full px-3 py-1 text-[10px] font-bold ${project.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex-1 max-w-[200px]">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100">
                                    <div className="h-full rounded-full bg-brand" style={{ width: `${project.progress}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="text-[11px]">
                                    <span className="text-gray-400 block">Category</span>
                                    <span className="font-bold text-gray-700">{project.category}</span>
                                </div>
                                <div className="text-[11px]">
                                    <span className="text-gray-400 block">Start Date</span>
                                    <span className="font-bold text-gray-700">{project.startDate}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectList;