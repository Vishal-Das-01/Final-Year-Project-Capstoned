import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { HttpStatusCode } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Role } from './utils/constants/enums';
import { FRONTEND_ROUTES } from './utils/routes/frontend_routes';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

export async function middleware(request) {

    if(request.nextUrl.pathname.startsWith('/student') || request.nextUrl.pathname.startsWith('/mentor') || request.nextUrl.pathname.startsWith('/admin')){
        const accessToken = request.cookies.get('accessToken');
        if (!accessToken) return NextResponse.redirect(new URL(FRONTEND_ROUTES.login_page,request.url));
        const { role } = jwtDecode(accessToken.value);
        if (role === Role.Student && request.nextUrl.pathname.startsWith('/student')) {
            return NextResponse.next();
        }
        else if (role === Role.Mentor && request.nextUrl.pathname.startsWith('/mentor')) {
            return NextResponse.next();
        }
        else if (role === Role.Admin && request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.next();
        }
        else {
            const url = request.nextUrl.clone()
            return NextResponse.redirect(url.origin + FRONTEND_ROUTES.landing_page + role.toLowerCase() + '/home');
        }
    }

    if (request.nextUrl.pathname.startsWith('/api/socket') || request.nextUrl.pathname.startsWith('/test') || request.nextUrl.pathname.startsWith('/api/auth') || !request.nextUrl.pathname.startsWith('/api')) return NextResponse.next();

    const authHeader = request.headers.get('Authorization');

    if (authHeader === null) return NextResponse.json({ message: 'No token provided' }, { status: HttpStatusCode.Unauthorized });

    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return NextResponse.json({ message: 'No token provided' }, { status: HttpStatusCode.Unauthorized });

    try {
        const { payload } = await jwtVerify(token, secret);

        const newHeaders = new Headers(request.headers)
        newHeaders.set('email', payload.email)
        newHeaders.set('role', payload.role)
        newHeaders.set('profileID', payload.profileID) // Need to recheck this later.

        if (request.nextUrl.pathname.startsWith('/api/admin')) {
            if (payload.role !== 'Admin') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.Forbidden })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/student')) {
            if (payload.role !== 'Student') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.Forbidden})
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/mentor')) {
            if (payload.role !== 'Mentor') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.Forbidden })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

        if (request.nextUrl.pathname.startsWith('/api/user')) {
            if (payload.role !== 'Mentor' && payload.role !== 'Student' && payload.role !== 'Admin') return NextResponse.json({ message: 'Unauthorized' }, { status: HttpStatusCode.Forbidden })
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Invalid token' }, { status: HttpStatusCode.Unauthorized });
    }

}
