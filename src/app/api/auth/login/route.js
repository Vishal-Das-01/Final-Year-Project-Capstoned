import { NextResponse } from 'next/server';
import { connectToDB } from "@/utils/helpers/connectDB";
import User from '@/models/User';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    await connectToDB();

    try {

        const { email, password } = await request.json();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: HttpStatusCode.NotFound });
        }

        if (user.activated === false) return NextResponse.json({ message: 'Account deactivated' }, { status: HttpStatusCode.Unauthorized });

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
            return NextResponse.json({ message: 'User authenticated', accessToken: accessToken, refreshToken: refreshToken }, { status: HttpStatusCode.Ok });
        }
        else {
            return NextResponse.json({ message: 'Password is incorrect' }, { status: HttpStatusCode.Unauthorized });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}