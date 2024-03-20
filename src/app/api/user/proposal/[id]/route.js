import { Role } from "@/utils/constants/enums";
import { connectToDB } from "@/utils/helpers/connectDB";
import Proposal from "@/models/Proposal";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Student from "@/models/Student";
import Group from "@/models/Group";

export async function GET(request, { params }) {
    connectToDB();

    try {
        const id = params.id;
        const proposal = await Proposal.findById(id);

        if (proposal) {
            return NextResponse.json(proposal, { status: HttpStatusCode.OK });
        } else {
            return NextResponse.json({ message: 'Proposal not found' }, { status: HttpStatusCode.NOT_FOUND });
        }

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}

export async function PATCH(request, { params }) {
    connectToDB();

    try {
        const id = params.id;
        const role = request.headers.get('role');
        const { description, proposalDoc } = await request.json();

        if (role === Role.Mentor) {
            const proposal = await Proposal.findOneAndUpdate({ _id: id, proposedBy: request.headers.get('profileID'), edit: true }, { description, proposalDoc }, { new: true });
            if (!proposal)
                return NextResponse.json({ message: "Proposal not found" }, { status: HttpStatusCode.NOT_FOUND });
            return NextResponse.json({ message: "Proposal updated", proposal: proposal }, { status: HttpStatusCode.OK });
        }

        if (role === Role.Student) {
            const student = await Student.findById(request.headers.get('profileID'));

            if (student.group === null)
                return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });


            const proposal = await Proposal.findOneAndUpdate({ _id: id, proposedBy: student.group, edit: true }, { description, proposalDoc }, { new: true });
            if (!proposal)
                return NextResponse.json({ message: "Proposal not found" }, { status: HttpStatusCode.NOT_FOUND });
            return NextResponse.json({ message: "Proposal updated", proposal: proposal }, { status: HttpStatusCode.OK });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}

export async function DELETE(request, { params }) {
    connectToDB();

    try {
        const id = params.id;
        const role = request.headers.get('role');

        if (role === Role.Mentor) {
            const proposal = await Proposal.findOneAndDelete({ _id: id, proposedBy: request.headers.get('profileID'), edit: true });
            if (proposal) {
                const mentor = await Mentor.findById(request.headers.get('profileID'));
                const myProposals = mentor.myProposals.filter(proposal => proposal != id);
                mentor.myProposals = myProposals;
                await mentor.save();
                return NextResponse.json({ message: "Proposal deleted" }, { status: HttpStatusCode.OK })
            };

            return NextResponse.json({ message: "Proposal not found" }, { status: HttpStatusCode.NOT_FOUND });
        }

        if (role === Role.Student) {
            const student = await Student.findById(request.headers.get('profileID'));

            if (student.group === null)
                return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

            const proposal = await Proposal.findOneAndDelete({ _id: id, proposedBy: student.group, edit: true });
            if (proposal) {
                const group = await Group.findById(student.group);
                const groupProposals = group.selectedProposal.filter(selected => selected.proposal != id);
                group.selectedProposal = groupProposals;
                await group.save();
                return NextResponse.json({ message: "Proposal deleted" }, { status: HttpStatusCode.OK });
            }

            return NextResponse.json({ message: "Proposal not found" }, { status: HttpStatusCode.NOT_FOUND });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}