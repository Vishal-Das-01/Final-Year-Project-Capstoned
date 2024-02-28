import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { HttpStatusCode } from 'axios';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

export async function middleware(request) {

    if (request.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next();

    const authHeader = request.headers.get('Authorization');

    if (authHeader === null) return NextResponse.json({ message: 'No token provided' }, { status: HttpStatusCode.UNAUTHORIZED });

    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return NextResponse.json({ message: 'No token provided' }, { status: HttpStatusCode.UNAUTHORIZED });

    try {
        const { payload } = await jwtVerify(token, secret);

        const newHeaders = new Headers(request.headers)
        newHeaders.set('email', payload.email)
        newHeaders.set('role', payload.role)
        newHeaders.set('profileID', payload.profileID) // Need to recheck this later.

        if (request.nextUrl.pathname.startsWith('/api/admin')) {
            if (payload.role !== 'Admin') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.FORBIDDEN })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/student')) {
            if (payload.role !== 'Student') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.FORBIDDEN })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/mentor')) {
            if (payload.role !== 'Mentor') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.FORBIDDEN })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/user')) {
            console.log(payload.role)
            if (payload.role !== 'Mentor' && payload.role !== 'Student') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.FORBIDDEN })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Invalid token' }, { status: HttpStatusCode.FORBIDDEN });
    }

}
