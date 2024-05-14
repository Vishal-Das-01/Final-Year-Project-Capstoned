import { connectToDB } from "@/utils/helpers/connectDB";
import Chat from "@/models/Chat";
import Message from "@/models/Message";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await connectToDB();

        try {
            const chatID = req.query.id;
            const profileID = req.headers.profileid;
            const role = req.headers.role;

            const chat = await Chat.findById(chatID);
            if(!chat) {
                return res.status(404).json({ message: 'Chat not found.' });
            }

            const participantExists = chat.participants.some(participant => participant.participant == profileID);

            if(!participantExists) {
                return res.status(403).json({ message: 'You are not a participant in this chat.' });
            }

            const message = await Message.create({ senderRole: role, sender: profileID, message: req.body.message});

            chat.messages.push(message._id);
            await chat.save();

            await message.populate('sender', 'firstName lastName gender profileImage')

            if(res.socket.server.io) {
                res.socket.server.io.emit(`chat:${chat._id}`, message);
            }
            
            return res.status(200).json({ message: 'Message sent.' });
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }
            return res.status(500).json({ message: 'Failed to send message.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}