import { Gender } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const studentSchema = new Schema({
    erp: {
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
        enum: [Gender.Male, Gender.Female]
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
        max: 4
    },
    resume: {
        type: String,
        default: ''
    },
    groupID: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
});