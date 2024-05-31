import { connectToDB } from "@/utils/helpers/connectDB";
import Notification from "@/models/Notification";
import { NotificationType } from "@/utils/constants/enums";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        await connectToDB();

        let updates = {}
        req.body = JSON.parse(req.body)
        if(req.body.headline !== undefined) updates.headline = req.body.headline;
        if(req.body.description !== undefined) updates.description = req.body.description;
        if(req.body.priority !== undefined) updates.priority = req.body.priority;
        if(req.body.activated !== undefined) updates.activated = req.body.activated;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
        }

        try {
            const notification = await Notification.findByIdAndUpdate(req.query.id, updates, { new: true })
            .select('-sender');
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found.' });
            }

            if (res.socket.server.io) {
                if(notification.type==NotificationType.ToIndividual) {
                    res.socket.server.io.emit(`notification:update:${notification.receiver}`, notification);
                }
                else {
                    const eventSuffix = notification.type.toLowerCase().replace('to ', '');
                    res.socket.server.io.emit(`notification:update:${eventSuffix}`, notification);
                }
            }

            return res.status(200).json({ message: 'Notification updated.', data: notification });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update notification.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}
