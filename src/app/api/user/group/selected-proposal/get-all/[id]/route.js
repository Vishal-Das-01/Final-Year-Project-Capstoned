import Group from "@/models/Group";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { Role } from "@/utils/constants/enums";

export async function GET(request, { params }) {
    await connectToDB();

    const role = request.headers.get('role');
    const profileID = request.headers.get('profileID');

    try {

        if (role == Role.Student) {
            const student = await Student.findById(profileID).select('group');
            if(student.group != params.id)
                return NextResponse.json({ message: "You cannot access others proposal." }, { status: HttpStatusCode.BadRequest });
        }
        const groupID = params.id;
        const group = await Group.findById(groupID).select('selectedProposal').populate('selectedProposal.proposal');

        if (!group) {
            return NextResponse.json({ message: "Group not found." }, { status: HttpStatusCode.NotFound })
        }

        return NextResponse.json({ message: "Success.", data: group }, { status: HttpStatusCode.Ok })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to retrieve selected proposal." }, { status: HttpStatusCode.InternalServerError })
    }
}