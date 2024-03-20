import { connectToDB } from "@/lib/utils";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    connectToDB();

    try {
        const body = await request.json();
        const projectID = body.projectID;
        const milestoneID = body.milestoneID;
        const marks = body.marks;

        const project = await Project.findById(projectID);
        const milestone = project.milestones.filter(milestone => milestone.ID === milestoneID);

        if(!milestone.completed)
            return NextResponse.json({ message: 'Milestone not completed' }, { status: HttpStatusCode.OK });

        const milestones = project.milestones.filter(milestone => milestone.ID !== milestoneID);
        milestone.marks = marks;
        milestones.push(milestone);
        project.milestones = milestones;
        await project.save();

        return NextResponse.json({ message: 'Milestone marked', project: project }, { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

}