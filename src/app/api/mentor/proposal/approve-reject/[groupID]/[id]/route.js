import { Approval } from "@/utils/constants/enums";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Proposal from "@/models/Proposal";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export async function PATCH(request,{params}) {
    connectToDB();

    try {
        const id = params.id;
        const groupID = params.groupID;
        const {approval} = await request.json();

        if (approval !== Approval.Rejected && approval !== Approval.Approved){
            return NextResponse.json({ message: 'Invalid approval status' }, { status: HttpStatusCode.BadRequest });
        }

        const group = await Group.findById(groupID);

        const selectedProposal = group.selectedProposal.filter(selected => (selected.proposal != id ));

        if(!selectedProposal)
            return NextResponse.json({ message: 'Proposal not found' }, { status: HttpStatusCode.NotFound });

        const proposal = {proposal: id, status: approval};

        selectedProposal.push(proposal);

        group.selectedProposal = selectedProposal;
        
        await group.save();

        return NextResponse.json({ message: `Proposal ${approval}` }, { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}