import { connectToDB } from "@/utils/helpers/connectDB";
import Notification from "@/models/Notification";
import Student from "@/models/Student";
import { NotificationPriority, NotificationType, Role } from "@/utils/constants/enums";


export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        await connectToDB();

        try {
            const memberID = req.query.id;
            const profileID = req.headers.profileid;

            const lead = await Student.findById(profileID).populate('group', 'name lead members mentors supervisor');
            const group = lead.group;
            if(!group) {
                return res.status(404).json({ message: 'Group not found.' });
            }

            if(group.lead != profileID) {
                return res.status(403).json({ message: 'Only the group lead can update the lead.' });
            }

            const memberIndex = group.members.indexOf(memberID);
            if(memberIndex === -1) {
                return res.status(404).json({ message: 'Member not found in group.' });
            }

            group.members.splice(memberIndex, 1);
            group.members.push(group.lead);
            group.lead = memberID;

            await group.save();
            
            await group.populate('lead', 'firstName lastName')

            const notification = await Notification.create({
                receiverRole: Role.Student, 
                receiver: memberID,
                headline: 'Group lead updated.',
                description: `${lead.firstName} ${lead.lastName} has made you group's lead`,
                priority: NotificationPriority.Moderate,
                type: NotificationType.ToIndividual
            });

            if(res.socket.server.io) {
                res.socket.server.io.emit(`notification:${memberID}`, notification);
            }

            for(const member of group.members) {
                if(member != profileID) {
                    const notification = await Notification.create({
                        receiverRole: Role.Student, 
                        receiver: member,
                        headline: 'Group lead updated.',
                        description: `Group lead of ${group.name} has been updated. The previous lead ${lead.firstName} ${lead.lastName} has made ${group.lead.firstName} ${group.lead.lastName} the new lead.`,
                        priority: NotificationPriority.Moderate,
                        type: NotificationType.ToIndividual
                    });
        
                    if(res.socket.server.io) {
                        res.socket.server.io.emit(`notification:${member}`, notification);
                    }
                }
            }


            const mentors = group.mentors;
            if(group.supervisor) {
                mentors.push(group.supervisor)
            }

            for(const mentor of mentors) {
                const notification = await Notification.create({
                    receiverRole: Role.Mentor, 
                    receiver: mentor,
                    headline: 'Group lead updated.',
                    description: `Group lead of ${group.name} has been updated. The previous lead ${lead.firstName} ${lead.lastName} has made ${group.lead.firstName} ${group.lead.lastName} the new lead.`,
                    priority: NotificationPriority.Moderate,
                    type: NotificationType.ToIndividual
                });
    
                if(res.socket.server.io) {
                    res.socket.server.io.emit(`notification:${mentor}`, notification);
                }
            }

            return res.status(200).json({ message: 'Lead updated.' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update lead.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}
