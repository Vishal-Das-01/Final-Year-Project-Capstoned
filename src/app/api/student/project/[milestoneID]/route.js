import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import AssignedMilestone from "@/models/AssignedMilestones";

export async function PATCH(request,{params}) {
    connectToDB();

    try {
        const milestoneID = params.milestoneID;
        const {submissionFile} = await request.json();


       const assignedMilestone = await AssignedMilestone.findById(milestoneID);

       if(assignedMilestone.submitted)
         return NextResponse.json({message: 'Milestone already submitted'},{status: HttpStatusCode.BadRequest});

       if(assignedMilestone.marked)
            return NextResponse.json({message: 'Milestone already marked'},{status: HttpStatusCode.BadRequest});

        assignedMilestone.submitted = true;
        assignedMilestone.submissionTime = new Date();
        assignedMilestone.submissionFile = submissionFile;

        await assignedMilestone.save()
        
        return NextResponse.json({ message: 'Milestone submitted'}, { status: HttpStatusCode.Ok });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }

}