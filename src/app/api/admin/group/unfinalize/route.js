import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const groupID = request.nextUrl.searchParams.get('id');

        const group = await Group.findById(groupID).select('confirmed');
        if(!group) {
            return NextResponse.json({ message: "Group not found." }, { status: HttpStatusCode.NotFound });
        }

        if(group.confirmed === false) {
            return NextResponse.json({ message: "Group is already unfinalized." }, { status: HttpStatusCode.BadRequest });
        }

        await Group.findByIdAndUpdate(groupID, { confirmed: false });

        return NextResponse.json({message: "Group unfinalized."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to unfinalize group."}, {status: HttpStatusCode.InternalServerError});
    }
}