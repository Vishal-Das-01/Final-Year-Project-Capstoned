import { Approval } from "@/utils/constants/enums";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Proposal from "@/models/Proposal";
import { NextResponse } from "next/server";

export async function POST(request) {
    connectToDB();

    try {
        const id = params.id;
        const groupID = params.groupID;
        const {approval} = await request.json();

        if (approval !== Approval.Rejected || approval !== Approval.Approved){
            return NextResponse.json({ message: 'Invalid approval status' }, { status: HttpStatusCode.BAD_REQUEST });
        }

        const group = await Group.findById(groupID);

        selectedProposal = group.selectedProposal.filter(selected => (selected.proposal !== id && selected.status !== Approval.AwaitingApproval));

        if(!selectedProposal)
            return NextResponse.json({ message: 'Proposal not found' }, { status: HttpStatusCode.NOT_FOUND });

        const proposal = {proposal: id, status: approval};

        selectedProposal.push(proposal);
        group.selectedProposal = selectedProposal;

        if(approval === Approval.Approved){
            const proposal = await Proposal.findByIdAndUpdate(id, {edit: false});
        }

        await group.save();

        return NextResponse.json({ message: `Proposal ${approval}` }, { status: HttpStatusCode.OK });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });
    }
}