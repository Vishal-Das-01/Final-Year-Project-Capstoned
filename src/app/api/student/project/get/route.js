import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Project from "@/models/Project";
import Student from "@/models/Student";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request){
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');

        const student = await Student.findById(profileID);

        if(student.group === null)
            return NextResponse.json({ message: 'Student not in a group' }, { status: HttpStatusCode.OK });

        const group = await Group.findById(student.group);
        const project = await Project.findById(group.project);

        return NextResponse.json(project, { status: HttpStatusCode.OK});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}