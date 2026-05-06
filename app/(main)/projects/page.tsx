import { Button } from '@/app/components/commons';
import ProjectToolbar from '@/app/components/ui/ProjectToolbar';
import { Suspense } from 'react';

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

async function getUsers(page: string) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${BASE_URL}/api/projects?page=${page}`, {
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

export default async function ProjectsPage({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const currentPage = page || '1';

    const projects = await getUsers(currentPage);

    if (!projects) {
        return <div className="p-6 text-red-500 font-bold">Failed to load projects</div>;
    }
    
    const pageData = {
        title: "Projects",
        description: "Manage your projects and their details."
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
                <Button variant='primary' href='/projects/create'>
                    Create Project
                </Button>
            </header>

            <Suspense key={currentPage} fallback={<div>Loading...</div>}>
                <ProjectToolbar projects={projects.data} />
            </Suspense>
        </div>
    );
}
