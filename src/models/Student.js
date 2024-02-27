import { Gender } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const studentSchema = new Schema({
    studentID: {
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
        enum: Object.keys(Gender)
    },
    contact: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 4
    },
    gpa: {
        type: Number,
        required: true,
        max: 4.0
    },
    program: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        default: null
    },
    industriesOfInterest: [{
        type: String,
        enum: Object.keys(Industry)
    }],
    groupInvites: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
}, { timestamps: true });

const Student = models.Student || model('Student', studentSchema);
export default Student;