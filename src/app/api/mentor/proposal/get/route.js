import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function GET(request) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const proposals = await Mentor.findById(profileID).populate('myProposals');
        return NextResponse.json(proposals, { status: HttpStatusCode.OK });
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}

