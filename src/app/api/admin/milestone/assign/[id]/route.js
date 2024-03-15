import { connectToDB } from "@/lib/utils";
import Milestone from "@/models/Milestone";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    connectToDB();

    try {
        const id = params.id;
        const body = await request.json();
        const project = body.projects;

        for (let i = 0; i < project.length; i++) {
            const project = await Project.findOne({_id: project[i],finished: false});
            project.milestones.push({
                ID: id,
                completed: false,
                file: [],
                marks:[]
            })
            await project.save();
        }

        return NextResponse.json({ message: 'Milestones assigned successfully' }, { status: HttpStatusCode.CREATED });

    } catch (error) {
        return NextResponse.json({ message: 'Error assigning milestones' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }

}