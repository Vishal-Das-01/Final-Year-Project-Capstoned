import { connectToDB } from "@/utils/helpers/connectDB";
import { Role } from "@/utils/constants/enums";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";
import Company from "@/models/Company";

export const GET = async (req, res) => {
    await connectToDB();
    const role = req.headers.get('role');
    const profileID = req.headers.get('profileID');

    if (role === Role.Student) {
        const student = await Student.findById(profileID);
        if (!student) {
            return new NextResponse.json({ message: "Student not found." }, { status: HttpStatusCode.NOT_FOUND });
        }
        return NextResponse.json(student, { status: HttpStatusCode.OK });
    }

    if (role === Role.Mentor) {
        const mentor = await Mentor.findById(profileID).populate({
            path: 'company',
            select: 'name'
        });;
        if (!mentor) {
            return new NextResponse.json({ message: "Mentor not found." }, { status: HttpStatusCode.NOT_FOUND });
        }
        return NextResponse.json(mentor, { status: HttpStatusCode.OK });
    }

}