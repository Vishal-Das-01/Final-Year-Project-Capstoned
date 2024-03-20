import { connectToDB } from "@/lib/utils";
import Mentor from "@/models/Mentor";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function GET(request){
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const mentor = await Mentor.findById(profileID);
        return NextResponse.json(mentor.groups, { status: HttpStatusCode.OK});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}