import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['Pending', 'Accepted'],
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['In-progress', 'Confirmed'],
        required: true
    }  
},{timestamps: true})

const Group = models.Group || model('Group', groupSchema);
export default Group;
