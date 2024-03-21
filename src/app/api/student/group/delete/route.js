import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";
import Project from "@/models/Project";
import Request from "@/models/Request";

export const DELETE = async (request) => {
    await connectToDB();

    try {
        const groupID = request.nextUrl.searchParams.get('id');
        const group = await Group.findById(groupID);
        if(!group) {
            return NextResponse.json({message: "Group not found."}, {status: HttpStatusCode.NotFound});
        }

        console.log(group);

        await Promise.all([
            group.lead ? Student.updateOne({ _id: group.lead }, { $set: { group: null } }) : Promise.resolve(),
            group.supervisor ? Mentor.updateOne({ _id: group.supervisor }, { $set: { group: null } }) : Promise.resolve(),
            group.project ? Project.updateOne({ _id: group.project }, { $set: { group: null } }) : Promise.resolve(),
            group.mentors.length > 0 ? Mentor.updateMany({ _id: { $in: group.mentors } }, { $set: { group: null } }) : Promise.resolve(),
            group.members.length > 0 ? Student.updateMany({ _id: { $in: group.members } }, { $set: { group: null } }) : Promise.resolve(),
            Request.deleteMany({ group: groupID })
        ]);

        await Group.findByIdAndDelete(groupID);

        return NextResponse.json({message: "Group deleted."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to delete group."}, {status: HttpStatusCode.InternalServerError});
    }
}