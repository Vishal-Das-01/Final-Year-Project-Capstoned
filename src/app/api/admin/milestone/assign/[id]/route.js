import { connectToDB } from "@/lib/utils";
import Milestone from "@/models/Milestone";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { finished } from "nodemailer/lib/xoauth2";

export async function POST(request, { params }) {
    connectToDB();

    try {
        const id = params.id;
        const body = await request.json();

        const projects = await Project.find({finished: false})
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const milestone = project.milestones.find(milestone => milestone.ID === id);
            if (milestone) {
                return NextResponse.json({ message: 'Milestone already assigned' }, { status: HttpStatusCode.BAD_REQUEST });
            }
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