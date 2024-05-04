import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Proposal from "@/models/Proposal";

export async function GET(request) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const proposals = await Mentor.findById(profileID).populate('myProposals');
        return NextResponse.json(proposals.myProposals, { status: HttpStatusCode.OK });
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}

