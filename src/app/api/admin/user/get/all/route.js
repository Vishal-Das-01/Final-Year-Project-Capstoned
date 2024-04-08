import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";

export const GET = async (request) => {
    await connectToDB();

    try {
        const users = await User.find().select('-password');

        return NextResponse.json({message: "Success.", data: users}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve users."}, {status: HttpStatusCode.InternalServerError});
    }
}