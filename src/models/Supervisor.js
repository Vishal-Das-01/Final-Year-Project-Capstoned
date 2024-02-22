import { model, models, Schema } from 'mongoose';

const supervisorSchema = new Schema({
    profID: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    areaOfInterest: [{
        type: String,
    }],
    contact: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        default: null
    },
    available: {
        type: Boolean,
        default: true
    },
    officeHours: {
        type: [{
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            },
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
        }],
        validator: function (value) {
            return value.length < 8;
        },
    },
    groupsID: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    groupInvites: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    myProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
}, { timestamps: true });

const Supervisor = models.Supervisor || model('Supervisor', supervisorSchema);
export default Supervisor;