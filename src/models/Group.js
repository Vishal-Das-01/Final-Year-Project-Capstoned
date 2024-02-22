import { Status } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    leadID: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    membersID: [
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
    supervisorID: {
        type: Schema.Types.ObjectId,
        ref: 'Supervisor'
    },
    status: {
        type: String,
        enum: [Status.Pending, Status.Confirmed],
        required: true
    }
}, { timestamps: true })

const Group = models.Group || model('Group', groupSchema);
export default Group;
