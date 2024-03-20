import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    connectToDB();

    try {
        const projectID = request.params.id;
        const milestoneID = request.params.milestoneid;
        const body = await request.json();
        const files = body.files;

        const project = await Project.findById(projectID);

        const milestoneToSubmit = Milestone.findById(milestoneID);

        // if(milestoneToSubmit.deadline) check deadline here

        const milestone = project.milestones.filter(milestone => milestone.ID === milestoneID);

        if (milestone.completed)
            return NextResponse.json({ message: 'Milestone already completed' }, { status: HttpStatusCode.OK });

        const milestones = project.milestones.filter(milestone => milestone.ID !== milestoneID);
        milestones.push(milestone);
        project.milestones = milestones;

        await project.save();

        return NextResponse.json({ message: 'Milestone completed', project: project }, { status: HttpStatusCode.OK });


    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

}