import UserForm from "@/app/components/ui/UserForm";

const Page = () => {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Add User
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Create a new user
                    </p>
                </div>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <UserForm />
            </div>
        </div>
    );
};

export default Page;