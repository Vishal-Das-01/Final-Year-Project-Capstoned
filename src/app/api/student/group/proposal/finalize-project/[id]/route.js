import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Project from "@/models/Project";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { Approval } from "@/utils/constants/enums";

export async function POST(request, { params }) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const id = params.id

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BadRequest });

        const group = await Group.findById(student.group);

        if (group.project)
            return NextResponse.json({ message: 'Group has already finalized a project' }, { status: HttpStatusCode.BadRequest });

        if (profileID != group.lead)
            return NextResponse.json({ message: 'You are not the lead of the group' }, { status: HttpStatusCode.BadRequest });

        const chosenProposal = group.selectedProposal.filter(proposals => proposals.proposal == id);
        
        console.log(chosenProposal)

        if (chosenProposal[0].status !== Approval.Approved)
            return NextResponse.json({ message: 'Proposal has not been approved' }, { status: HttpStatusCode.BadRequest });

        // for(const group of group.selectedProposal) {
        //     if(group.p)
        //     const proposal = await Proposal.findById(group.proposal);

        // }

        console.log(group)

        group.selectedProposal = [];

        const project = new Project({
            proposal: id,
            group: group._id,
            milestones: [],
            year: new Date().getFullYear(),
        })

        const proposal = await Proposal.findById(id);

        if (proposal.proposer === "Mentor" && proposal.mentorship) {
            if (proposal.proposedBy !== group.supervisor && !group.mentors.includes(proposal.proposedBy))
                group.mentors.push(proposal.proposedBy);
        }

        group.project = project._id;
        proposal.available = false;
        
        console.log(group)
        console.log(project)
        console.log(proposal)
        // await group.save();
        // await project.save();

        return NextResponse.json({ message: 'Project Finalized', project: project }, { status: HttpStatusCode.Ok });

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: HttpStatusCode.InternalServerError });
    }

}