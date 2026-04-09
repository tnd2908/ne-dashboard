import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/mock/users';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 10;

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedUsers = MOCK_USERS.slice(startIndex, endIndex);

        return NextResponse.json({
            data: paginatedUsers,
            total: MOCK_USERS.length,
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