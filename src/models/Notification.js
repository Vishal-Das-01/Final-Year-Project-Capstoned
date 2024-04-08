import { NotificationType } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
},{timestamps: true})

const Notification = models.Notification || model('Notification', notificationSchema);
export default Notification;
