import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/lib/utils";
import Supervisor from "@/models/Supervisor";
import User from "@/models/User";
import isEmail from "validator/lib/isEmail";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
    await connectToDB();

    try {
        const data = await request.json()

        if (data.role == null || data.role === "")
            return NextResponse.json({ message: "Role is required" }, { status: HttpStatusCode.BAD_REQUEST });

        if (data.email == null || data.email === "" || !isEmail(data.email))
            return NextResponse.json({ message: "Correct email is required" }, { status: HttpStatusCode.BAD_REQUEST });

        const generatedPassword = crypto.randomBytes(20).toString('hex');

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: ,
        //         pass: 
        //     }
        // });
        if (data.role === "Supervisor") {
            console.log(generatedPassword)
            const supervisor = new Supervisor(data.details);
            const user = new User({
                email: data.email,
                password: generatedPassword,
                role: data.role,
                profileID: supervisor._id
            })
            console.log(supervisor, user);
            await supervisor.save();
            await user.save();
            return NextResponse.json({ message: "Supervisor created" }, { status: HttpStatusCode.OK });
        }
        // const email = request.headers.get('email')
        // const profileID = request.headers.get('profileID')
        // console.log(email, profileID);
        // return NextResponse.json({ message: "Hello from admin route" });

    } catch (error) {
        if (error.name === "ValidationError")
            return NextResponse.json({ message: "Please provide the correct or necessary fields." }, { status: HttpStatusCode.BAD_REQUEST });
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}