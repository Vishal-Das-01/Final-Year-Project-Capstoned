import { connectToDB } from "@/lib/utils";
import Milestone from "@/models/Milestone";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
    connectToDB();

    try {
        const body = await request.json();
        const milestones = await Milestone.find({ year: body.year});
        return NextResponse.json( milestones , { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching projects' }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}