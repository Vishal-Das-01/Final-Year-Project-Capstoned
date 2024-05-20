import Mentor from "@/models/Mentor";
import Project from "@/models/Project";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request){
    await connectToDB();

    try {
        const profileID = request.headers.get("profileID");
        const pastProjects = await Mentor.findById(profileID).select('pastProjects').populate('pastProjects');

        return NextResponse.json({message: 'Success', data: pastProjects}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error.message}, {status: HttpStatusCode.InternalServerError});
    }
}