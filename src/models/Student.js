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
        enum: ['male', 'female']
    },
    contact: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        enum: [5, 6, 7, 8]
    },
    gpa: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value < 4;
            },
            message: '{VALUE} is not less than 4'
        }
    },
    resume: {
        type: String,
        default: ''
    },
    groupID: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});