// import { NextResponse } from "next/server";
// import {serialize} from 'cookie';
// import { HttpStatusCode } from "axios";
// import jwt from 'jsonwebtoken';
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);

// export async function POST(request, response) {
//     try {
//         const authHeader = request.headers.get('Authorization');
//         const token = authHeader && authHeader.split(' ')[1];
//         const { payload } = await jwtVerify(token, secret);

//         const accessToken = jwt.sign({ email: payload.email, role: payload.role, profileID: payload.profileID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });

//         const accessTokenCookie = serialize('accessToken', accessToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'strict',
//             maxAge: 3600,
//             path: '/'
//         });
 

//         return NextResponse.json({
//             message: 'User authenticated',
//             accessToken: accessToken
//         }, {
//             status: HttpStatusCode.Ok,
//             headers: {
//                 'Set-Cookie': [
//                     'accessToken=' + accessToken + '; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/',
//                     'refreshToken=' + null + '; HttpOnly; Secure; SameSite=Strict; Max-Age=259200; Path=/'
//                 ]            }
//         });

//     } catch (error) {
//         return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
//     }
// }