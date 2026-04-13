import { Project } from "@/types/types";

export async function getProject(id: string): Promise<Project | null> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 60 }
        });
        console.log(res)

        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch project');
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProjects = async (page?: string, limit?: number) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
        const url = new URL(`${BASE_URL}/api/projects`);
        if (page) url.searchParams.set('page', page);
        if (limit) url.searchParams.set('limit', limit.toString());

        const res = await fetch(url.toString(), {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}