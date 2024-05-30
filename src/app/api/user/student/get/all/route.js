import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Student from "@/models/Student";
import { paginationParams } from "@/utils/helpers/paginationParams";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            { page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit') }
        )

        const students = await Student.find().select('studentID firstName lastName gender profileImage gpa group resume industriesOfInterest').populate('group', 'name').sort({ firstName: 1 }).skip(skip).limit(limit);

        const totalStudents = await Student.countDocuments();
        const totalPages = Math.ceil(totalStudents / limit);

        return NextResponse.json({ message: "Success.", data: { page, totalStudents, totalPages, students } }, { status: HttpStatusCode.Ok });
    } catch (error) {
        return NextResponse.json({ message: "Failed to retrieve students." }, { status: HttpStatusCode.InternalServerError });
    }
}