import Mentor from "@/models/Mentor";
import Proposal from "@/models/Proposal";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    connectToDB();

    try {
        const { proposalID } = await request.json();
        const profileID = request.headers.get('profileID');
        const proposal = await Proposal.findById(proposalID);
        if (proposal.edit && proposal.proposedBy == 'Mentor' && proposal.proposer == profileID) {
            const deletedProposal = await Proposal.findByIdAndDelete(proposalID);
            const mentor = await Mentor.findById(profileID);
            const myProposals = mentor.myProposals.filter(proposal => proposal != proposalID);
            mentor.myProposals = myProposals;
            await mentor.save();
            return NextResponse.json({ message: 'Proposal deleted' }, { status: HttpStatusCode.Ok });
        }
        else {
            return NextResponse.json({ message: 'Proposal cannot be deleted' }, { status: HttpStatusCode.BadRequest })
        }
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}