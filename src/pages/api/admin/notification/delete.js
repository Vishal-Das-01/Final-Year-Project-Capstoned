import { connectToDB } from "@/utils/helpers/connectDB";
import Notification from "@/models/Notification";
import { NotificationType } from "@/utils/constants/enums";

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        await connectToDB();

        try {
            const notification = await Notification.findByIdAndDelete(req.query.id).select('-sender');
            if(!notification) {
                return res.status(400).json({ message: 'Notification not found.' });
            }

            if (res.socket.server.io) {
                if(notification.type==NotificationType.ToIndividual) {
                    res.socket.server.io.emit(`notification:delete:${notification.receiver}`, notification);
                }
                else {
                    const eventSuffix = notification.type.toLowerCase().replace('to ', '');
                    console.log(eventSuffix)
                    res.socket.server.io.emit(`notification:delete:${eventSuffix}`, notification);
                }
            }
        
            return res.status(200).json({ message: 'Notification deleted.' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete notification.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}