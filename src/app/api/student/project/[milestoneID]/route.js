import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import AssignedMilestone from "@/models/AssignedMilestones";

export async function PATCH(request, { params }) {
    connectToDB();

    try {
        const milestoneID = params.milestoneID;
        const { submissionFile } = await request.json();

        const assignedMilestone = await AssignedMilestone.findById(milestoneID).populate('milestoneID');

        if (assignedMilestone.submitted)
            return NextResponse.json({ message: 'Milestone already submitted' }, { status: HttpStatusCode.BadRequest });

        if (assignedMilestone.marked)
            return NextResponse.json({ message: 'Milestone already marked' }, { status: HttpStatusCode.BadRequest });

        if (assignedMilestone.milestoneID.deadline < new Date())
            return NextResponse.json({ message: 'Milestone deadline passed' }, { status: HttpStatusCode.BadRequest });

        assignedMilestone.submitted = true;
        assignedMilestone.submissionTime = new Date();
        assignedMilestone.submissionFile = submissionFile;

        await assignedMilestone.save()

        const project = await Project.findById(assignedMilestone.projectID).populate({ path: 'milestones', select: 'milestoneID submitted', populate: { path: 'milestoneID', select: 'percentage' } });

        let progress = 0;
        for (const pMilestone of project.milestones) {
            if (pMilestone.submitted)
                progress += pMilestone.milestoneID.percentage;
        }

        project.progress = progress;
        await project.save();

        return NextResponse.json({ message: 'Milestone submitted' }, { status: HttpStatusCode.Ok });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}