import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import AssignedMilestone from "@/models/AssignedMilestones";
import Group from "@/models/Group";
import Student from "@/models/Student";
import Milestone from "@/models/Milestone";

export async function POST(request, { params }) {
    await connectToDB();

    try {
        const id = params.id;

        const milestoneToAssign = await Milestone.findById(id);

        const allMilestones = await Milestone.find({year: milestoneToAssign.year, assigned: true});

        let percentage = 0;
        for( const mile of allMilestones) {
            percentage = percentage + mile.percentage;
        }

        if (percentage + milestone.percentage > 100) {
            return NextResponse.json({ message: 'The total weightage of milestones cannot exceed 100%' }, { status: HttpStatusCode.BadRequest });
        }

        const projects = await Project.find({finished: false})
                    .populate('milestones', 'milestoneID')
                    .populate("group","lead members")

        for(const project of projects){

            if(project.milestones.find(milestone => milestone.milestoneID == id)){
                continue;
            }
            const marks = [];
            marks.push({member: project.group.lead, marks: 0});   

            for(const member of project.group.members){
                marks.push({member: member, marks: 0});
            }

            const assignedMilestone =  new AssignedMilestone({
                projectID: project._id,
                milestoneID: id,
                marks: marks
            })
            project.milestones.push(assignedMilestone._id);
            await assignedMilestone.save();
            await project.save();
        }

        const milestone = await Milestone.findByIdAndUpdate(id, {assigned: true});
        
        return NextResponse.json({ message: 'Milestones assigned successfully' }, { status: HttpStatusCode.Ok });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error assigning milestones' }, { status: HttpStatusCode.InternalServerError });
    }

}