import { connectToDB } from "@/lib/utils";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Project from "@/models/Project";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function POST(request, { params }) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const id = params.id

        const student = await Student.findById(profileID);

        if (student.group === null)
            return NextResponse.json({ message: 'Student is not in a group' }, { status: HttpStatusCode.BAD_REQUEST });

        const group = await Group.findById(student.group);

        if (profileID != group.lead)
            return NextResponse.json({ message: 'You are not the lead of the group' }, { status: HttpStatusCode.BAD_REQUEST });

        const chosenProposal = group.selectedProposal.filter(proposals => proposals.proposal === id);

        if (chosenProposal.status !== 'Approved')
            return NextResponse.json({ message: 'Proposal has not been approved' }, { status: HttpStatusCode.BAD_REQUEST });

        group.selectedProposal = [];

        const project = new Project({
            proposal: id,
            group: group._id,
            milestones: [],
            year: new Date().getFullYear(),
        })

        const proposal = await Proposal.findById(id);

        if (proposal.mentorship) {
            if (proposal.proposedBy !== group.supervisor)
                if (!group.mentors.includes(proposal.proposedBy))
                    group.mentors.push
        }

        group.project = project._id;

        const supervisor = await Mentor.findById(group.supervisor);

        const assignProject = supervisor.groups;

        assignProject = assignProject.filter(unassigned => unassigned.group !== group._id);

        assignProject.push({ group: group._id, project: project._id });

        supervisor.groups = assignProject;

        await group.save();
        await project.save();
        await supervisor.save();

        return NextResponse.json({ message: 'Project Finalized', project: project }, { status: HttpStatusCode.OK });

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

}