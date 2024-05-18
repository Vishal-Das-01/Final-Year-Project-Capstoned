import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import AssignedMilestone from "@/models/AssignedMilestones";

export async function POST(request, { params }) {
    await connectToDB();

    try {
        const id = params.id;

        const projects = await Project.find({finished: false});

        for(const project of projects){
            const assignedMilestone =  new AssignedMilestone({
                projectID: project._id,
                milestoneID: id,
            })
            project.milestones.push(assignedMilestone._id);
            // console.log(project);
            // console.log(assignedMilestone)
            await assignedMilestone.save();
            await project.save();
        }

        return NextResponse.json({ message: 'Milestones assigned successfully' }, { status: HttpStatusCode.Ok });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error assigning milestones' }, { status: HttpStatusCode.InternalServerError });
    }

}