import { connectToDB } from "@/lib/utils";
import Group from "@/models/Group";

export const GET = async (request, { params }) => {
    await connectToDB();

    try {
        const group = await Group.findById(params.id).populate('project').populate('lead').populate('members');
        if(!group) {
            return new Response("Group not found.", { status: 404 });
        }

        return new Response(JSON.stringify(group), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch group.", { status: 500 });
    }
}