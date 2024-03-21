import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request,{params}) {
    connectToDB();

    try {
        const id = params.id;
        const body = await request.json();

        const milestone = await Milestone.findByIdAndUpdate(id, body);

        return NextResponse.json({ message: 'Milestone updated successfully', milestone: milestone }, { status: HttpStatusCode.CREATED });

    } catch (error) {
        return NextResponse.json({ message: 'Error creating milestone' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}