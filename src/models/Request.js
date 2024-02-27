import { RequestType } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const requestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        refPath: 'User',
        required: true 
    },
    receiver: {
        type: Schema.Types.ObjectId,
        refPath: 'User',
        required: true 
    },
    type: {
        type: String,
        enum: Object.keys(RequestType),
        required: true
    }  
},{timestamps: true})

const Request = models.Request || model('Request', requestSchema);
export default Request;
