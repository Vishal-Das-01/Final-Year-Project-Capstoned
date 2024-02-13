import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import User from '@/models/User';
import { HttpStatusCode } from 'axios';

export async function POST(req) {
    await connectToDB();
    const { message } = await req.json();
    console.log(message)
    return NextResponse.json({ message: message },{status: HttpStatusCode.OK});
}