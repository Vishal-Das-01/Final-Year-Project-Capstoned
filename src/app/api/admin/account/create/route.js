import { NextResponse } from "next/server";

export async function POST(request) {
    console.log(request)
    const { num } = await request.json()
    const email = request.headers.get('email')
    const profileID = request.headers.get('profileID')
    console.log(email,profileID);
    console.log(num)
    return NextResponse.json({ message: "Hello from admin route" });
}