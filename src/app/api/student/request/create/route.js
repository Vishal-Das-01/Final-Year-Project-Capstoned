import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { RequestType } from "@/utils/constants/enums";
import Request from "@/models/Request";
import Student from "@/models/Student";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";

export const POST = async (request) => {
    await connectToDB();
    const { receiver, type } = await request.json();
    const profileID = request.headers.get('profileID');

    try {
        if(profileID==receiver) {
            return NextResponse.json({message: "Invalid request"}, {status: HttpStatusCode.BadRequest});
        }

        const student = await Student.findById(profileID).populate('group', 'members supervisor mentors');
        if(!student.group) {
            return NextResponse.json({message: "Group does not exist."}, {status: HttpStatusCode.BadRequest});
        }
        const group = student.group

        const requestExists=await Request.findOne({sender: profileID, receiver})
        if(requestExists) {
            return NextResponse.json({message: "Request already exists."}, {status: HttpStatusCode.BadRequest});
        }

        switch(type) {
            case RequestType.GroupMember:
            
                if(group.members.length==5) {
                    return NextResponse.json({message: "Group limit is already full."}, {status: HttpStatusCode.BadRequest});
                }
            
                const groupMember = await Student.findById(receiver);
                if(!groupMember) {
                    return NextResponse.json({message: "Invalid request"}, {status: HttpStatusCode.BadRequest});
                }

                if(group.members.includes(groupMember._id)) {
                    return NextResponse.json({message: "Student is already in the group."}, {status: HttpStatusCode.BadRequest});
                }
                
                if(groupMember.group) {
                    return NextResponse.json({message: "Student is already in another group."}, {status: HttpStatusCode.BadRequest});
                }

                break;
            case RequestType.Supervisor: 

                if(group.supervisor) {
                    return NextResponse.json({message: "Supervisor is already present in the group."}, {status: HttpStatusCode.BadRequest});
                }
        
                const supervisor = await Mentor.findById(receiver);
                if(!supervisor) {
                    return NextResponse.json({message: "Invalid request"}, {status: HttpStatusCode.BadRequest});
                }

                if(!supervisor.canSupervise) {
                    return NextResponse.json({message: "This user cannot supervise."}, {status: HttpStatusCode.BadRequest});
                }

                if(group.mentors.includes(supervisor._id)) {
                    return NextResponse.json({message: "Cannot add mentor as supervisor."}, {status: HttpStatusCode.BadRequest});
                }
                
                break;
            case RequestType.Mentor:
                
                if(group.mentors.length==3) {
                    return NextResponse.json({message: "Group limit is already full."}, {status: HttpStatusCode.BadRequest});
                }
            
                const mentor = await Mentor.findById(receiver);
                if(!mentor) {
                    return NextResponse.json({message: "Invalid request"}, {status: HttpStatusCode.BadRequest});
                }

                if(group.mentors.includes(mentor._id)) {
                    return NextResponse.json({message: "Mentor is already in the group."}, {status: HttpStatusCode.BadRequest});
                }
                
                if(group.supervisor==mentor._id) {
                    return NextResponse.json({message: "Cannot add supervisor as mentor."}, {status: HttpStatusCode.BadRequest});
                }
                
                break;
            default:
                return NextResponse.json({ message: "Invalid request." }, { status: HttpStatusCode.BadRequest });
        }

        await Request.create({sender: profileID, receiver, type});
        
        return NextResponse.json({message: "Request posted."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields." }, { status: HttpStatusCode.BadRequest });
        }
        return NextResponse.json({message: "Failed to post request."}, {status: HttpStatusCode.InternalServerError});
    }
}