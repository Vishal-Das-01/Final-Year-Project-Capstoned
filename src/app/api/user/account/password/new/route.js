import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";
import bcrypt from 'bcrypt';

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const { newPassword } = await request.json();
        const email = request.headers.get('email');

        const user = await User.findOne({ email });
        if(!user) {
            return new NextResponse.json({ message: "User not found." }, { status: HttpStatusCode.NotFound });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        user.password = encryptedPassword;
        await user.save();

        return NextResponse.json({message: "Password updated."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to update password."}, {status: HttpStatusCode.InternalServerError});
    }
}