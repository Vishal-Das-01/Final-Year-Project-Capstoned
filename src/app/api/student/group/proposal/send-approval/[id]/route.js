import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Proposal from "@/models/Proposal";
import { Approval } from "@/utils/constants/enums";

export async function PATCH(request, { params }) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const id = params.id

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BadRequest });

        const group = await Group.findById(student.group);

        if (profileID != group.lead)
            return NextResponse.json({ message: 'You are not the lead of the group' }, { status: HttpStatusCode.BadRequest });

        if (group.supervisor === null)
            return NextResponse.json({ message: 'Group does not have a supervisor' }, { status: HttpStatusCode.BadRequest });

        const selectedProposal = group.selectedProposal.filter(selected => (selected.proposal == id));

        if (selectedProposal[0].status === Approval.AwaitingApproval)
            return NextResponse.json({ message: 'Proposal already awaiting approval' }, { status: HttpStatusCode.BadRequest });

        if (selectedProposal[0].status === Approval.Approved)
            return NextResponse.json({ message: 'Proposal already approved' }, { status: HttpStatusCode.BadRequest });

        if (selectedProposal.length === 0)
            return NextResponse.json({ message: 'Proposal not found' }, { status: HttpStatusCode.NotFound });

        const remainingProposal = group.selectedProposal.filter(selected => (selected.proposal != id));

        const proposal = { proposal: id, status: Approval.AwaitingApproval };

        remainingProposal.push(proposal);
        group.selectedProposal = remainingProposal;

        await group.save();

        return NextResponse.json({ message: 'Proposal sent for approval' }, { status: HttpStatusCode.Ok });

    } catch (error) {

        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}