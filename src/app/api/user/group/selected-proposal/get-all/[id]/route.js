import Group from "@/models/Group";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Proposal from "@/models/Proposal";

export async function GET(request, { params }) {
    await connectToDB();

    try {
        const groupID = params.id;
        const group = await Group.findById(groupID).select('selectedProposal').populate('selectedProposal.proposal');

        if (!group) {
            return NextResponse.json({ message: "Group not found." }, { status: HttpStatusCode.NotFound })
        }

        return NextResponse.json({ message: "Success.", data: group }, { status: HttpStatusCode.Ok })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to retrieve selected proposal." }, { status: HttpStatusCode.InternalServerError })
    }
}