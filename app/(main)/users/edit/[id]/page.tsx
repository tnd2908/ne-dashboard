
import UserForm from '@/app/components/ui/UserForm';
import { getUser } from "@/services/user.service";

interface PageProps {
    params: Promise<{ id: string }>;
}
const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const user = await getUser(id);
    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Edit User
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Update user information
                    </p>
                </div>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <UserForm initialData={user}/>
            </div>
        </div>
    );
};

export default Page;