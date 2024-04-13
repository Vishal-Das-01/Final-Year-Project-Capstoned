import { connectToDB } from "@/utils/helpers/connectDB";
import { RequestType } from "@/utils/constants/enums";
import Request from "@/models/Request";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        await connectToDB();
        const profileID = req.headers.profileid;

        try {
            const requestToAccept = await Request.findById(req.query.id);
            if(!requestToAccept) {
                return res.status(404).json({ message: 'Request not found.' });
            }

            if(requestToAccept.receiver!=profileID) {
                return res.status(403).json({ message: 'Unauthorized.' });
            }

            const student = await Student.findById(requestToAccept.sender).populate('group', 'members supervisor mentors');
            const group = student.group;

            switch(requestToAccept.type) {
                case RequestType.GroupMember:
                
                    if(group.members.length==5) {
                        return res.status(400).json({ message: 'Group limit is already full.' });
                    }
            
                    const groupMember = await Student.findById(profileID);
                
                    if(groupMember.group) {
                        return res.status(400).json({ message: 'You are already in a group.' });
                    }

                    group.members.push(groupMember._id)
                    await group.save();

                    break;
                case RequestType.Supervisor: 

                    if(group.supervisor) {
                        return res.status(400).json({ message: 'Supervisor is already present in the group.' });
                    }
        
                    const supervisor = await Mentor.findById(profileID);

                    if(!supervisor.canSupervise) {
                        return res.status(400).json({ message: 'Your supervisor role is off. Please go to your profile settings to turn on your supervisor role.' });
                    }

                    if(group.mentors.includes(supervisor._id)) {
                        return res.status(400).json({ message: 'You are already a mentor to this group.' });
                    }

                    group.supervisor = supervisor._id;
                    await group.save();
                
                    break;
                case RequestType.Mentor:
                    if(group.mentors.length==3) {
                        return res.status(400).json({ message: 'Group limit is already full.' });
                    }
            
                    const mentor = await Mentor.findById(profileID);
                
                    if(group.supervisor==mentor._id) {
                        return res.status(400).json({ message: 'You are already a supervisor to this group.' });
                    }

                    group.mentors.push(mentor._id)
                    await group.save();
                
                    break;
            }

            await Request.findByIdAndDelete(req.query.id);

            if(res.socket.server.io) {
                res.socket.server.io.emit(`request:delete:${requestToAccept.sender}`, requestToAccept);
            }

            return res.status(200).json({ message: 'Request accepted.' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to accept request.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}
