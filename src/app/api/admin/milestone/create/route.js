import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    connectToDB();

    try {
        const body = await request.json();

        const milestone = new Milestone(body);
        await milestone.save();

        return NextResponse.json({ message: 'Milestone created successfully', milestone: milestone }, { status: HttpStatusCode.CREATED });

    } catch (error) {
        return NextResponse.json({ message: 'Error creating milestone' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}