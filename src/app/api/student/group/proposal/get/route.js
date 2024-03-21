import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function GET(request) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

        const group = await Group.findById(student.group);

        return NextResponse.json({ selectedProposal: group.selectedProposal }, { status: HttpStatusCode.OK });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}