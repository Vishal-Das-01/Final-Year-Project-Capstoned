import { connectToDB } from "@/utils/helpers/connectDB";
import { NotificationType, Role } from "@/utils/constants/enums";
import Notification from "@/models/Notification";
import Student from "@/models/Student";
import Mentor from "@/models/Mentor";
import Admin from "@/models/Admin";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await connectToDB();

        try {
            const { receiver, ...body } = req.body;
            const profileID = req.headers.profileid;

            if(NotificationType.ToIndividual==body.type) {
                if(!receiver) {
                    return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
                }
                
                let notification;

                const studentReceiver = await Student.findById(receiver);
                if(studentReceiver) {
                    notification = await Notification.create({
                        sender: profileID, receiverRole: Role.Student, ...req.body
                    });
                }
                else {
                    const mentorReceiver = await Mentor.findById(receiver);
                    if (mentorReceiver) {
                        notification = await Notification.create({ 
                            sender: profileID, receiverRole: Role.Mentor, ...req.body 
                        });
                    }
                    else {
                        const adminReceiver = await Admin.findById(receiver);
                        if (adminReceiver) {
                            notification = await Notification.create({ 
                                sender: profileID, receiverRole: Role.Admin, ...req.body 
                            });
                        }
                        else {
                            return res.status(404).json({ message: 'Receiver not found' });
                        }
                    }
                }

                if(res.socket.server.io) {
                    res.socket.server.io.emit(`notification:${receiver}`, notification);
                }
            }
            else {
                const notification = await Notification.create({sender: profileID, ...body});

                if(res.socket.server.io) {
                    const eventSuffix = notification.type.toLowerCase().replace('to ', '');
                    res.socket.server.io.emit(`notification:${eventSuffix}`, notification);
                }
            }
        
            return res.status(200).json({ message: 'Notification posted.' });
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }
            return res.status(500).json({ message: 'Failed to post notification.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}