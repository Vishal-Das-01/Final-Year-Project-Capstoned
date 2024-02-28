import { Status } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
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
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    mentors: [
        {
            mentor: {
                type: Schema.Types.ObjectId,
                ref: 'Mentor'
            }
        }
    ],
    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Group = models.Group || model('Group', groupSchema);
export default Group;
