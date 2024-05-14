import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
    const body = await request.json();

    connectToDB();

    try {
        // Uncomment later
        // const projects = await Project.find({ year: body.year,finished: false});

        // Remove this line later when project is properly built
        const projects = await Project.find({finished: false});

        return NextResponse.json( projects , { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching projects' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}