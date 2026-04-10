import { User } from "@/types/types";

export async function getUser(id: string): Promise<User | null> {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${BASE_URL}/api/users/${id}`, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch user');
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}
