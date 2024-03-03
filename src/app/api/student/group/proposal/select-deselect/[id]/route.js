import { connectToDB } from "@/lib/utils";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Group from "@/models/Group";
import { Approval } from "@/constants/enums";

export async function POST(request, { params }) {
    connectToDB();
    try {
        const id = params.id;

        const profileID = request.headers.get('profileID');

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

        const group = await Group.findById(student.group);

        if (group.selectedProposal.length === 5)
            return NextResponse.json({ message: 'Group has reached the maximum number of proposals' }, { status: HttpStatusCode.BAD_REQUEST });

        group.selectedProposal.push({ proposal: id, status: Approval.Pending });

        const proposal = await Proposal.findOneAndUpdate({ _id: id, proposer:'Mentor' }, { edit: false, available: false, selectedBy: group._id });

        await group.save();

        return NextResponse.json({ message: 'Proposal selected' }, { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}
export async function DELETE(request, { params }) {
    connectToDB();
    try {
        const id = params.id;

        const profileID = request.headers.get('profileID');

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

        const group = await Group.findById(student.group);
        const proposal = await Proposal.findById(id);

        if (proposal.proposedBy === group._id)
            return NextResponse.json({ message: 'You cannot deselect your own proposal' }, { status: HttpStatusCode.BAD_REQUEST });

        group.selectedProposal = group.selectedProposal.filter(selected => selected.proposal != id);

        proposal.edit = true;
        proposal.available = true;
        proposal.selectedBy = null;

        await group.save();
        await proposal.save();

        return NextResponse.json({ message: 'Proposal deselected' }, { status: HttpStatusCode.OK });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}
