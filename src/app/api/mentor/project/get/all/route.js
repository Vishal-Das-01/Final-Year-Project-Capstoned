import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Group from "@/models/Group";
import Project from "@/models/Project";
import Proposal from "@/models/Proposal";

export async function GET(request) {
    await connectToDB();

    try {
        const projects = []
        const profileID = request.headers.get('profileID');
        const mentorGroups = await Mentor.findById(profileID).select('groups').populate('groups.groupID', 'project name');
        for (const group of mentorGroups.groups) {
            if (group.groupID.project) {
                const project = await Project.findById(group.groupID.project).populate('proposal', 'title');
                projects.push({ projectID: project._id, groupName: group.groupID.name, projectTitle: project.proposal.title, progress: project.progress, year: project.year });
            }
        }

        return NextResponse.json({ message: "Success", data: projects }, { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}