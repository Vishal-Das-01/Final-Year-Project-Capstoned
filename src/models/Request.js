import { RequestType, Role } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const requestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true 
    },
    receiverRole: {
        type: String,
        enum: Object.values(Role),
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        refPath: 'receiverRole',
        required: true 
    },
    type: {
        type: String,
        enum: Object.values(RequestType),
        required: true
    }  
},{timestamps: true})

const Request = models.Request || model('Request', requestSchema);
export default Request;
