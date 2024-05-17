import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function GET(request){
    await connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const mentor = await Mentor.findById(profileID).select('groups');
        // await mentor.populate
        return NextResponse.json(mentor.groups, { status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}