import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import User from '@/models/User';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    await connectToDB();

    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: HttpStatusCode.UNAUTHORIZED });
        }

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
            return NextResponse.json({ message: 'User authenticated', accessToken: accessToken, refreshToken: refreshToken }, { status: HttpStatusCode.OK });
        }
        else {
            return NextResponse.json({ message: 'Password is incorrect' }, { status: HttpStatusCode.UNAUTHORIZED });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

    // const encryptedPass = await bcrypt.hash('hello world', 10);
    // const user = new User({
    //     email: 'admin@fypms.com',
    //     password: encryptedPass,
    //     role: 'Admin'
    // });
    // const response = await user.save();
    // return NextResponse.json({ message: response }, { status: HttpStatusCode.OK });
}