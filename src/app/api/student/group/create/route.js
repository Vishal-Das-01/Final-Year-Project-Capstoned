import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Student from "@/models/Student";

export const POST = async (request) => {
    await connectToDB();
    const { name, profileImage } = await request.json();
    const profileID = request.headers.get('profileID');

    try {
        const student = await Student.findById(profileID);
        if(student.group) {
            return NextResponse.json({message: "Group already exists."}, {status: HttpStatusCode.Conflict});
        } 

        const group=new Group({lead: profileID, name, profileImage});
        await group.save();

        student.group=group._id;
        await student.save();

        return NextResponse.json({message: "Group created."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields." }, { status: HttpStatusCode.BadRequest });
        }
        return NextResponse.json({message: "Failed to create group."}, {status: HttpStatusCode.InternalServerError});
    }
}