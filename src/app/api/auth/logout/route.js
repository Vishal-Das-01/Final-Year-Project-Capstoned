import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        
        return NextResponse.json({ message: 'Logout successful' }, { status: HttpStatusCode.Ok, headers: {
            'Set-Cookie': [
                'accessToken=' + null + '; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
                // 'refreshToken=' + null + '; HttpOnly; Secure; SameSite=Strict; Max-Age=259200; Path=/'
            ]
        } });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}