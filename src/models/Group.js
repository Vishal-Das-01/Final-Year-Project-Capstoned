import { model, models, Schema } from 'mongoose';

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    workingProjectID: {
        type: Schema.Types.ObjectId,
        ref: 'WorkingProject'
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
                enum: ['Pending', 'Accepted'],
                required: true
            }
        }
    ],
    supervisorID: {
        type: Schema.Types.ObjectId,
        ref: 'Supervisor'
    },
    mentorID: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentor'
    }],
    industryMentorID: [{
        type: Schema.Types.ObjectId,
        ref: 'IndustryMentor'
    }],
    status: {
        type: String,
        enum: ['Pending', 'Confirmed'],
        required: true
    }
}, { timestamps: true })

const Group = models.Group || model('Group', groupSchema);
export default Group;
