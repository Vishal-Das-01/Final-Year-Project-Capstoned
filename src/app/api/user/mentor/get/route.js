import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";

export const GET = async (request) => {
    await connectToDB();

    try {
        const mentorID = request.nextUrl.searchParams.get('id');
        const mentor = await Mentor.findById(mentorID);
        if(!mentor) {
            return NextResponse.json({message: "Mentor not found."}, {status: HttpStatusCode.NotFound});
        }

        return NextResponse.json({message: "Success.", data: mentor}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve mentor."}, {status: HttpStatusCode.InternalServerError});
    }
}