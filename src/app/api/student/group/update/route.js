import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const groupID = request.nextUrl.searchParams.get('id');
        const { lead, name, profileImage } = await request.json();

        if (!lead && !name && !profileImage) {
            return NextResponse.json({ message: "Body cannot be empty." }, { status: HttpStatusCode.BadRequest });
        }

        const group = await Group.findById(groupID);
        if (!group) {
            return NextResponse.json({ message: "Group not found." }, { status: HttpStatusCode.NotFound });
        }

        if (name) {
            group.name = name;
        }

        if (profileImage) {
            group.profileImage = profileImage;
        }

        if (lead && !group.lead.equals(lead)) {
            const member = group.members.findIndex(member => member.equals(lead));
            if (member==-1) {
                return NextResponse.json({ message: "Member does not exist in group." }, { status: HttpStatusCode.BadRequest });
            }

            group.members.splice(member, 1);
            group.members.push(group.lead);
            group.lead = lead;
        }

        await group.save();

        return NextResponse.json({message: "Group updated."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to update group."}, {status: HttpStatusCode.InternalServerError});
    }
}