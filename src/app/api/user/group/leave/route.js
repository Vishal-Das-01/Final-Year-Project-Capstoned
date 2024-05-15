import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Student from "@/models/Student";
import { Role } from "@/utils/constants/enums";
import Mentor from "@/models/Mentor";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const role = request.headers.get('role');
        const groupID = request.nextUrl.searchParams.get("id");

        const group = await Group.findById(groupID);
        if(!group) {
            return NextResponse.json({ message: "Group not found." }, { status: HttpStatusCode.NotFound });
        }

        if (role === Role.Student) {
            const student = await Student.findById(profileID);

            if(!student.group || student.group != groupID) {
                return NextResponse.json({ message: "You are not a member of this group." }, { status: HttpStatusCode.BadRequest });
            }
            
            if(group.lead == profileID) {
                return NextResponse.json({ message: "Lead cannot leave the group." }, { status: HttpStatusCode.BadRequest });
            }

            student.group = null;
            await student.save();

            group.members = group.members.filter(member => member != profileID);
            await group.save();
        }
        else if (role === Role.Mentor) {
            const mentor = await Mentor.findById(profileID);

            if(!mentor.groups.some(group => group.groupID == groupID)) {
                return NextResponse.json({ message: "You are not a mentor to this group." }, { status: HttpStatusCode.BadRequest });
            }

            mentor.groups = mentor.groups.filter(group => group.groupID != groupID);
            await mentor.save();

            group.mentors = group.mentors.filter(mentor => mentor != profileID);
            await group.save();
        }

        return NextResponse.json({message: "You have left the group."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to leave group."}, {status: HttpStatusCode.InternalServerError});
    }
}