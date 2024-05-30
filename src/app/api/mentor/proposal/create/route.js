import { connectToDB } from "@/utils/helpers/connectDB";
import Proposal from "@/models/Proposal";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Mentor from "@/models/Mentor";

export async function POST(request) {
    connectToDB();
    try {

        const mentor = await Mentor.findById(request.headers.get('profileID')).populate('myProposals', 'available');

        let numOfProposals = 0;
        mentor.myProposals.forEach(proposal => {
            if (proposal.available) {
                numOfProposals++;
            }
        });

        if (numOfProposals === 5) {
            return NextResponse.json({ message: 'You have reached the maximum number of proposals' }, { status: HttpStatusCode.BadRequest });
        }

        const { title, description, proposalDoc, industries, mentorship} = await request.json();
        
        const proposal = new Proposal({
            proposer: 'Mentor',
            proposedBy: request.headers.get('profileID'),
            title,
            description,
            proposalDoc,
            mentorship,
            industries
        });

        mentor.myProposals.push(proposal._id);

        await proposal.save();
        await mentor.save();

        return NextResponse.json({ message: 'Proposal created', proposalID: proposal._id }, { status: HttpStatusCode.Ok });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}