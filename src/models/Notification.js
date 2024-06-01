import { NotificationPriority, NotificationType, Role } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    receiverRole: {
        type: String,
        enum: Object.values(Role)
    },
    receiver: {
        type: Schema.Types.ObjectId,
        refPath: 'receiverRole'
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
    read: {
        type: Boolean,
        default: false,
        required: true
    },
    activated: {
        type: Boolean,
        default: true,
        required: true
    }
},{timestamps: true})

const Notification = models.Notification || model('Notification', notificationSchema);
export default Notification;
