import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";
import { paginationParams } from "@/utils/helpers/paginationParams";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const mentors = await Mentor.find().
        select('firstName lastName gender isUniversityTeacher canSupervise occupation').
        skip(skip).limit(limit);

        const totalMentors = await Mentor.countDocuments();
        const totalPages = Math.ceil(totalMentors/limit);

        return NextResponse.json({message: "Success.", data: {page, totalMentors, totalPages, mentors}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve mentors."}, {status: HttpStatusCode.InternalServerError});
    }
}