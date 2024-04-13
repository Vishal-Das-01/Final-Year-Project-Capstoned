import { NotificationPriority, NotificationType } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    headline: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(NotificationPriority),
        required: true
    },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activated: {
        type: Boolean,
        default: true
    }
},{timestamps: true})

const Notification = models.Notification || model('Notification', notificationSchema);
export default Notification;
