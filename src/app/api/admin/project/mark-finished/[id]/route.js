import { connectToDB } from "@/lib/utils";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request,{params})
{
    connectToDB();
    try {
        const id = params.id;

        const project = await Project.findByIdAndUpdate(id, {finished: true}, {new: true});
        return NextResponse.json({message:"Project marked finished"}, { status: HttpStatusCode.OK});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}