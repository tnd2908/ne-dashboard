import { NextResponse } from "next/server";
import { MOCK_USERS } from "@/mock/users";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ message: "Wrong username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ user });
  
  response.cookies.set('user_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  });

  return response;
}