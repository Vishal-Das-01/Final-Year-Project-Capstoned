import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import OTP from "@/models/OTP";

export const DELETE = async (request) => {
    await connectToDB();

    try {
        await OTP.deleteMany({ expiresAt: { $lt: new Date() } });

        return NextResponse.json({message: "OTP table has been cleaned."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to cleanup OTP table."}, {status: HttpStatusCode.InternalServerError});
    }
}