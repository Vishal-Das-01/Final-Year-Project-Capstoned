import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Proposal from "@/models/Proposal";
import Group from "@/models/Group";

export async function GET(request) {
    connectToDB();

    try {
        const profileID = request.headers.get('profileID');
        const proposals = await Mentor.findById(profileID).populate({
            path: 'myProposals',
            populate: { 
                path: 'selectedBy',
                select: 'name'
            }
        });        
        return NextResponse.json(proposals.myProposals, { status: HttpStatusCode.Ok });
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}

