import { connectToDB } from "@/utils/helpers/connectDB";
import { RequestType, Role } from "@/utils/constants/enums";
import Request from "@/models/Request";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await connectToDB();

        try {
            const { receiver, type } = req.body;
            const profileID = req.headers.profileid;
            let receiverRole;

            if(profileID==receiver) {
                return res.status(400).json({ message: 'Invalid request.' });
            }

            const student = await Student.findById(profileID).populate('group', 'members supervisor mentors project');
            if(!student.group) {
                return res.status(400).json({ message: 'Group does not exist' });
            }
            const group = student.group

            if(student.group.project){
                return res.status(400).json({ message: 'Project is finalized, cannot sent request.' });
            }

            const requestExists=await Request.findOne({sender: profileID, receiver})

            if(requestExists) {
                return res.status(400).json({ message: 'Request already exists.' });
            }

            switch(type) {
                case RequestType.GroupMember:
            
                    if(group.members.length==5) {
                        return res.status(400).json({ message: 'Group limit is already full.' });
                    }
            
                    const groupMember = await Student.findById(receiver);
                    if(!groupMember) {
                        return res.status(400).json({ message: 'Student is already in the group.' });
                    }

                    if(group.members.includes(groupMember._id)) {
                        return res.status(400).json({ message: 'Student is already in this group.' });
                    }
                
                    if(groupMember.group) {
                        return res.status(400).json({ message: 'Student is already in the group.' });
                    }

                    receiverRole = Role.Student;

                    break;
                case RequestType.Supervisor: 

                    if(group.supervisor) {
                        return res.status(400).json({ message: 'Supervisor is already present in the group.' });
                    }
        
                    const supervisor = await Mentor.findById(receiver);
                    if(!supervisor) {
                        return res.status(400).json({ message: 'Invalid request.' });
                    }

                    if(!supervisor.canSupervise) {
                        return res.status(400).json({ message: 'This mentor cannot supervise.' });
                    }

                    if(group.mentors.includes(supervisor._id)) {
                        return res.status(400).json({ message: 'Cannot add mentor as supervisor.' });
                    }

                    receiverRole = Role.Mentor;
                
                    break;
                case RequestType.Mentor:
                
                    if(group.mentors.length==3) {
                        return res.status(400).json({ message: 'Group limit is already full.' });
                    }
            
                    const mentor = await Mentor.findById(receiver);
                    if(!mentor) {
                        return res.status(400).json({ message: 'Invalid request.' });
                    }

                    if(group.mentors.includes(mentor._id)) {
                        return res.status(400).json({ message: 'Mentor is already in the group.' });
                    }
                
                    if(group.supervisor==mentor._id) {
                        return res.status(400).json({ message: 'Cannot add supervisor as mentor.' });
                    }

                    receiverRole = Role.Mentor;
                
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid request.' });
            }

            const request = await Request.create({sender: profileID, receiverRole, receiver, type});

            await request.populate({
                path: 'sender',
                select: 'firstName lastName gender profileImage group',
                populate: {
                    path: 'group',
                    select: 'name'
                }
            })

            if(res.socket.server.io) {
                res.socket.server.io.emit(`request:${receiver}`, request);
            }
        
            return res.status(200).json({ message: 'Request sent.' });
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }
            return res.status(500).json({ message: 'Failed to send request.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}