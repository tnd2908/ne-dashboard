import { Suspense } from 'react';
import UsersTable from '@/app/components/ui/UsersTable';
import Button from '@/app/components/commons/Button';

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

async function getUsers(page: string) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${BASE_URL}/api/users?page=${page}`, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function TeamPage({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const currentPage = page || '1';

    const user = await getUsers(currentPage);

    if (!user) {
        return <div className="p-6 text-red-500 font-bold">Failed to load users</div>;
    }
    
    const pageData = {
        title: "Team Members",
        description: "Manage your organization and member permissions."
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {pageData.title}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {pageData.description}
                    </p>
                </div>
            </header>

            <Suspense key={currentPage} fallback={<div>Loading...</div>}>
                <UsersTable
                    users={user.data}
                    total={user.total}
                    currentPage={Number(currentPage)}
                />
            </Suspense>
        </div>
    );
}
