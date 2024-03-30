import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { RequestType } from "@/utils/constants/enums";
import Request from "@/models/Request";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";

export const PATCH = async (request) => {
    await connectToDB();
    const profileID = request.headers.get('profileID');

    try {
        const requestID = request.nextUrl.searchParams.get('id');
        const requestToAccept = await Request.findById(requestID);
        if(!requestToAccept) {
            return NextResponse.json({message: "Request not found."}, {status: HttpStatusCode.NotFound});
        }

        if(requestToAccept.receiver!=profileID) {
            return NextResponse.json({message: "Unauthorized."}, {status: HttpStatusCode.Unauthorized});
        }

        const student = await Student.findById(requestToAccept.sender).populate('group', 'members supervisor mentors');
        const group = student.group;

        switch(requestToAccept.type) {
            case RequestType.GroupMember:
                
                if(group.members.length==5) {
                    return NextResponse.json({message: "Group limit is already full."}, {status: HttpStatusCode.BadRequest});
                }
            
                const groupMember = await Student.findById(profileID);
                
                if(groupMember.group) {
                    return NextResponse.json({message: "You are already in a group."}, {status: HttpStatusCode.BadRequest});
                }

                group.members.push(groupMember._id)
                await group.save();

                break;
            case RequestType.Supervisor: 

                if(group.supervisor) {
                    return NextResponse.json({message: "Supervisor is already present in the group."}, {status: HttpStatusCode.BadRequest});
                }
        
                const supervisor = await Mentor.findById(profileID);

                if(!supervisor.canSupervise) {
                    return NextResponse.json({message: "Your supervisor role is off. Please go to your profile settings to turn on your supervisor role."}, {status: HttpStatusCode.BadRequest});
                }

                if(group.mentors.includes(supervisor._id)) {
                    return NextResponse.json({message: "You are already a mentor to this group."}, {status: HttpStatusCode.BadRequest});
                }

                group.supervisor = supervisor._id;
                await group.save();
                
                break;
            case RequestType.Mentor:
                if(group.mentors.length==3) {
                    return NextResponse.json({message: "Group limit is already full."}, {status: HttpStatusCode.BadRequest});
                }
            
                const mentor = await Mentor.findById(profileID);
                
                if(group.supervisor==mentor._id) {
                    return NextResponse.json({message: "You are already a supervisor to this group."}, {status: HttpStatusCode.BadRequest});
                }

                group.mentors.push(mentor._id)
                await group.save();
                
                break;
        }

        await Request.findByIdAndDelete(requestID);
        
        return NextResponse.json({message: "Request accepted."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields." }, { status: HttpStatusCode.BadRequest });
        }
        return NextResponse.json({message: "Failed to post request."}, {status: HttpStatusCode.InternalServerError});
    }
}