import { NextResponse } from 'next/server';
import { MOCK_PROJECTS } from '@/mock/projects';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 10;

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedProjects = MOCK_PROJECTS.slice(startIndex, endIndex);

        return NextResponse.json({
            data: paginatedProjects,
            total: MOCK_PROJECTS.length,
            page,
            limit
        }, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Failed to fetch users" },
            { status: 500 }
        );
    }
}