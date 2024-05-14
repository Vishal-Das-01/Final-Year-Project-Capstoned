import { Role } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const chatSchema = new Schema({
    participants: [
        {
            participantRole: { 
                type: String, 
                enum: Object.values(Role),
                required: true
            },
            participant: { 
                type: Schema.Types.ObjectId, 
                refPath: 'participants.participantRole',
                required: true
            },
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, { timestamps: true });

const Chat = models.Chat || model('Chat', chatSchema);
export default Chat;