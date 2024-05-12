import { NextResponse } from 'next/server';
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie';
import User from '@/models/User';
import Student from '@/models/Student';
import Mentor from '@/models/Mentor';
import Admin from '@/models/Admin';
import Group from '@/models/Group';
import Request from '@/models/Request';
import Company from '@/models/Company';
import Milestone from '@/models/Milestone';
import Notification from '@/models/Notification';
import Project from '@/models/Project';
import Proposal from '@/models/Proposal';

export async function POST(request, response) {
    await connectToDB();

    try {

        const { email, password } = await request.json();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: HttpStatusCode.NotFound });
        }

        if (user.activated === false) return NextResponse.json({ message: 'Account deactivated' }, { status: HttpStatusCode.Unauthorized });

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
            // const refreshToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
            
            const accessTokenCookie = serialize('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 6*60*60,
                path: '/'
            });
            // const refreshTokenCookie = serialize('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: 'strict',
            //     maxAge: 259200,
            //     path: '/'
            // });

            return NextResponse.json({
                message: 'User authenticated',
                accessToken: accessToken,
                profileImage: user.profileImage,
            }, {
                status: HttpStatusCode.Ok,
                headers: {
                    'Set-Cookie': [accessTokenCookie]
                }
            });
        }
        else {
            return NextResponse.json({ message: 'Password is incorrect' }, { status: HttpStatusCode.Unauthorized });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}