import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/mock/users';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pageParam = searchParams.get('page');
        const limitParam = searchParams.get('limit');

        if (!limitParam) {
            return NextResponse.json({
                data: MOCK_USERS,
                total: MOCK_USERS.length,
                page: 1,
                limit: MOCK_USERS.length
            }, {
                status: 200
            });
        }

        const page = parseInt(pageParam || '1');
        const limit = parseInt(limitParam);

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