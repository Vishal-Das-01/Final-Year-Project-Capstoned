import { Role } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const messageSchema = new Schema({
    senderRole: {
        type: String,
        enum: Object.values(Role),
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        refPath: 'receiverRole',
        required: true 
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = models.Message || model('Message', messageSchema);
export default Message;