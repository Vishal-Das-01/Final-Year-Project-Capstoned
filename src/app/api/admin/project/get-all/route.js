import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Proposal from "@/models/Proposal";
import { populate } from "dotenv";
import Group from "@/models/Group";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";

export async function GET(request) {

    await connectToDB();

    try {
        const projects = await Project.find()
            .populate({path: 'proposal', select: 'title proposalDoc proposer description industries'})
            .populate({path: 'group', select: 'name lead members supervisor mentors', populate: {path: 'name lead members supervisor mentors', select: 'firstName lastName'}});
        return NextResponse.json( projects , { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching projects' }, { status: HttpStatusCode.InternalServerError });
    }
}