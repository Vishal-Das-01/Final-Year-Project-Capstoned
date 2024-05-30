import Group from "@/models/Group";
import Student from "@/models/Student";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { populate } from "dotenv";
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import Proposal from "@/models/Proposal";
import Mentor from "@/models/Mentor";
import AssignedMilestone from "@/models/AssignedMilestones";
import Milestone from "@/models/Milestone";

export async function GET(request) {
    await connectToDB();

    try {
        const profileID = request.headers.get("profileID");

        const student = await Student.findById(profileID).select("group firstName lastName")

        if (student.group) {
            const group = await Group.findById(student.group)
                .select("lead supervisor project name members selectedProposals")
                .populate("lead supervisor members", "firstName lastName profileImage")
                .populate({ path: 'selectedProposal.proposal', select: 'title proposer proposedBy', populate: { path: 'proposedBy', select: 'firstName lastName' } })
                .populate({ path: 'project', select: 'progress milestones proposal', populate: { path: 'proposal', select: 'title' } })

            let milestone = null;

            if (group.project) {
                const assignedMilestones = await AssignedMilestone.find({ projectID: group.project?._id }).select('marked submitted milestoneID').populate('milestoneID', 'title deadline').sort({ deadline: 1 })
                for (const mil of assignedMilestones) {
                    if (mil.milestoneID.deadline > new Date()) {
                        milestone = mil;
                        break;
                    }
                }
                return NextResponse.json({ message: "Success", group, student, assignedMilestones, milestone: milestone.milestoneID }, { status: HttpStatusCode.Ok });
            }

            return NextResponse.json({ message: "Success", group, student }, { status: HttpStatusCode.Ok });
        }
        
        return NextResponse.json({ message: "Success", student }, { status: HttpStatusCode.Ok });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });
    }
}