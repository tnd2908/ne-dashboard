import { NextResponse } from 'next/server';
import { MOCK_PROJECTS } from '@/mock/projects';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = MOCK_PROJECTS.find(p => p.id === id);

        if (!project) {
            return NextResponse.json(
                { message: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(project, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch project" },
            { status: 500 }
        );
    }
}