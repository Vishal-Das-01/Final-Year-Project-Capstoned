import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";

export const GET = async (request) => {
    await connectToDB();

    try {
        const mentors = await Mentor.find().select('firstName lastName gender isUniversityTeacher canSupervise occupation');

        return NextResponse.json({message: "Success.", data: mentors}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve mentors."}, {status: HttpStatusCode.InternalServerError});
    }
}