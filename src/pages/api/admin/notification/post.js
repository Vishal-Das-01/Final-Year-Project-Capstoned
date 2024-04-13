import { connectToDB } from "@/utils/helpers/connectDB";
import { NotificationType } from "@/utils/constants/enums";
import Notification from "@/models/Notification";

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

                const notification = await Notification.create({sender: profileID, ...req.body});

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
            console.log(error)
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