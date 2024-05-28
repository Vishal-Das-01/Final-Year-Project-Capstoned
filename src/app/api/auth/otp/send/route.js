import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { generateOTP } from "@/utils/helpers/generateOTP";
import { transporter } from "@/utils/constants/emailConstant";
import OTP from "@/models/OTP";
import User from "@/models/User";

export const POST = async (request) => {
    await connectToDB();
    const { email } = await request.json();

    try {

        const user = await User.findOne({ email }).select("email");
        if(!user) {
            return NextResponse.json({ message: "User not found." }, { status: HttpStatusCode.NotFound });
        }

        const existingOTP = await OTP.findOne({ email });
        if(existingOTP) {
            if(existingOTP.expiresAt > new Date()) {
                return NextResponse.json({ message: "OTP already sent. Please wait before requesting another OTP." }, { status: HttpStatusCode.BadRequest });
            } else {
                await OTP.findOneAndDelete({ email });
            }
        }

        const uniqueOTP = generateOTP(6);
        await OTP.create({ email, otp: uniqueOTP });

        const otpEmailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your one-time OTP is ${uniqueOTP}. \n \nThis OTP will expire in 120 seconds.`
        };
        transporter.sendMail(otpEmailOptions, async (error, info) => {
            if(error) {
                await OTP.findOneAndDelete({ email });
                return NextResponse.json({ message: "Unable to send OTP mail." }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
            }
        })

        return NextResponse.json({message: "OTP sent."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields." }, { status: HttpStatusCode.BadRequest });
        }
        return NextResponse.json({message: "Failed to send OTP."}, {status: HttpStatusCode.InternalServerError});
    }
}