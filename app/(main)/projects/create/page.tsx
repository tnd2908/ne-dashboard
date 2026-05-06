import ProjectForm from "@/app/components/ui/ProjectForm";
import { getUsers } from "@/services/user.service";
import Error from "@/app/components/shared/Error";

const Page = async () => {
    const users = await getUsers();
    if (!users) {
        return (
            <Error title="Failed to load users" message="Please try again later" />
        );
    }
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Add Project
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Create a new project
                    </p>
                </div>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <ProjectForm users={users?.data || []} />
            </div>
        </div>
    );
};

export default Page;
