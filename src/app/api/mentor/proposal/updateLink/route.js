import Proposal from "@/models/Proposal";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    connectToDB();
    try {
        const { proposalID, link } = await request.json();
        const proposal = await Proposal.findById(proposalID);
        proposal.proposalDoc = link;
        await proposal.save();
        return NextResponse.json({ message: 'Link updated' }, { status: HttpStatusCode.Ok });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
} 