import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Student from "@/models/Student";

export const GET = async (request) => {
    await connectToDB();

    try {
        const students = await Student.find().select('studentID firstName lastName gender');

        return NextResponse.json({message: "Success.", data: students}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve students."}, {status: HttpStatusCode.InternalServerError});
    }
}