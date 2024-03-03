import { connectToDB } from "@/lib/utils"
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Group from "@/models/Group";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { Approval } from "@/constants/enums";

export async function POST(request) {
    connectToDB();
    try {
        const student = await Student.findById(request.headers.get('profileID'));

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

        const group = await Group.findById(student.group);

        if (group.project != null)
            return NextResponse.json({ message: 'Group already has a project' }, { status: HttpStatusCode.BAD_REQUEST });

        const { title, description, proposalDoc, industries } = await request.json();

        const proposal = new Proposal({
            proposer: 'Group',
            proposedBy: group._id,
            title,
            description,
            proposalDoc,
            industries,
            available: false
        });

        group.selectedProposal.push({ proposal: proposal._id, status: Approval.Pending });

        await proposal.save();
        await group.save();

        return NextResponse.json({ message: 'Proposal created' }, { status: HttpStatusCode.OK });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

}
