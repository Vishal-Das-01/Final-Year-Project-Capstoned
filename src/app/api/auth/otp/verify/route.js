import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import OTP from "@/models/OTP";
import User from '@/models/User';
import Student from "@/models/Student";

export const POST = async (request) => {
    await connectToDB();
    const { email, otp } = await request.json();

    try {
        if(otp.toString().length != 6) {
            return NextResponse.json({ message: "Invalid OTP." }, { status: HttpStatusCode.BadRequest });
        }

        const existingOTP = await OTP.findOne({ email });
        if(!existingOTP) {
            return NextResponse.json({ message: "Invalid request." }, { status: HttpStatusCode.InternalServerError });
        }

        if(existingOTP.expiresAt < new Date()) {
            return NextResponse.json({ message: "OTP has expired." }, { status: HttpStatusCode.BadRequest }); 
        } 
        
        if(existingOTP.attempts === 3) {
            return NextResponse.json({ message: "Invalid attempts exceeded." }, { status: HttpStatusCode.Forbidden }); 
        }

        if(existingOTP.expiresAt >= new Date() && existingOTP.otp != otp) {
            existingOTP.attempts++
            await existingOTP.save()

            return NextResponse.json({ message: "Invalid OTP." }, { status: HttpStatusCode.BadRequest }); 
        } 
        
        const user = await User.findOne({ email: email }).populate(
            'profileID', 'firstName lastName gender profileImage'
        );
        if(!user) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: HttpStatusCode.NotFound });
        }

        if(user.activated === false) return NextResponse.json({ message: 'Account deactivated' }, { status: HttpStatusCode.Unauthorized });

        const accessToken = jwt.sign({ email: email, role: user.role, profileID: user.profileID._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
        const accessTokenCookie = serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 6*60*60,
            path: '/'
        });

        await OTP.findOneAndDelete({ email });

        return NextResponse.json({
            message: 'Verification successful',
            accessToken,
            user: {
                firstLogin: user.firstLogin,
                profileID: user.profileID
            }
        }, {
            status: HttpStatusCode.Ok,
            headers: {
                'Set-Cookie': [accessTokenCookie]
            }
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields.", request }, { status: HttpStatusCode.BadRequest });
        }
        console.log(error)
        return NextResponse.json({message: "Failed to verify OTP."}, {status: HttpStatusCode.InternalServerError});
    }
}