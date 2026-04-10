import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/mock/users';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = MOCK_USERS.find(u => u.id === id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    void password; // Explicitly mark as unused

    return NextResponse.json(userWithoutPassword, {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
