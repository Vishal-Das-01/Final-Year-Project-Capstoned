import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Student from "@/models/Student";

export const GET = async (request) => {
    await connectToDB();

    try {
        const studentID = request.nextUrl.searchParams.get('id');
        const student = await Student.findById(studentID);
        if(!student) {
            return NextResponse.json({message: "Student not found."}, {status: HttpStatusCode.NotFound});
        }

        return NextResponse.json({message: "Success.", data: student}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve student."}, {status: HttpStatusCode.InternalServerError});
    }
}