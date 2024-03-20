import { connectToDB } from "@/utils/helpers/connectDB";
import Proposal from "@/models/Proposal";
import { NextResponse } from "next/server";

export async function GET(request) {
    connectToDB();

    try {
        const {industries} = await request.json();

        const proposals = await Proposal.find({ available: true, proposer: 'Mentor'});

        if (industries) {
            const filteredProposals = proposals.filter(proposal => proposal.industries.some(industry => industries.includes(industry)));
            return NextResponse.json(filteredProposals, { status: HttpStatusCode.OK });
        }
        
        return NextResponse.json(proposals, { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}