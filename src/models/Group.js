import { Status } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    members: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            status: {
                type: String,
                enum: [Status.Pending, Status.Confirmed],
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: [Status.Pending, Status.Confirmed],
        required: true
    }  
},{timestamps: true})

const Group = models.Group || model('Group', groupSchema);
export default Group;
