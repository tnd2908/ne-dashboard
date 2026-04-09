import { NextResponse } from "next/server";
import { MOCK_USERS } from "@/mock/users";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name } = body;

        const userExists = MOCK_USERS.some((user) => user.email === email);

        if (userExists) {
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Registration successful",
                user: { name, email }
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}