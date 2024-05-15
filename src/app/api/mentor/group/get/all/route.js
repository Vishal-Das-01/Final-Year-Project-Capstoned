import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";
import Group from "@/models/Group";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

export async function GET(request, response) {
    await connectToDB();

    try {
        const profileID = request.headers.get('profileID');

        const mentor = await Mentor.findById(profileID).select('groups')


        if (mentor.groups.length === 0) {
            return NextResponse.json({ message: 'No groups found.' }, { status: HttpStatusCode.NotFound });
        }

        const groupDetails = [];

        for (const group of mentor.groups) {
            const singleGroup = await Group.findById(group.groupID).select('members mentors name supervisor').populate('supervisor', 'firstName lastName');
            groupDetails.push({_id: group.groupID, role: group.role, details:singleGroup});
        }

        return NextResponse.json({ message: 'Success.', data: groupDetails }, { status: HttpStatusCode.Ok });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to retrieve groups.' }, { status: HttpStatusCode.InternalServerError });

    }
}