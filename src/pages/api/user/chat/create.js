import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";
import Chat from "@/models/Chat";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await connectToDB();

        try {
            const { participants } = JSON.parse(req.body);
            console.log(participants)

            let profileIDExists = false;

            if(participants.length < 2) {
                return res.status(400).json({ message: 'At least 2 participants are required.' });
            }

            for (const participant of participants) {

                if(participant.participant == req.headers.profileid) {
                    profileIDExists = true;
                }

                const user = await User.findOne({ profileID: participant.participant })
                if(!user || participant.participantRole != user.role) {
                    return res.status(400).json({ message: 'Invalid user provided.' });
                }
            }

            if(!profileIDExists) {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }

            const participantIds = participants.map(participant => participant.participant);
            const uniqueParticipantIds = new Set(participantIds);

            if (participantIds.length !== uniqueParticipantIds.size) {
                return res.status(400).json({ message: 'Participant IDs should be unique.' });
            }   

            const existingChat = await Chat.findOne({ 'participants.participant': { $all: participantIds } });
            if (existingChat) {
                return res.status(400).json({ message: 'Chat with same participants already exists.' });
            }

            const chat = await Chat.create({ participants });

            if(res.socket.server.io) {
                res.socket.server.io.emit(`chats`, chat);
            }
            
            return res.status(200).json({ message: 'Chat created.' });
        } catch (error) {
            console.log(error)
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }
            return res.status(500).json({ message: 'Failed to create chat.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}