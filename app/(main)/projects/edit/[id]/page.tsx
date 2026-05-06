
import Error from '@/app/components/shared/Error';
import ProjectForm from '@/app/components/ui/ProjectForm';
import { getProject } from "@/services/project.service";
import { getUsers } from "@/services/user.service";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page = async ({ params }: PageProps) => {
    const { id } = await params;
        console.log(id)

    const [project, usersData] = await Promise.all([
        getProject(id),
        getUsers()
    ]);
    
if (!project || !usersData) {
        return (
            <Error title="Project not found" message="The project you're looking for doesn't exist or you don't have permission to view it." />
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Edit Project
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Update project information
                    </p>
                </div>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <ProjectForm initialData={project} users={usersData.data} />
            </div>
        </div>
    );
};

export default Page;