import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {

    await connectToDB();

    try {
        const projects = await Project.find();
        return NextResponse.json( projects , { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching projects' }, { status: HttpStatusCode.InternalServerError });
    }
}