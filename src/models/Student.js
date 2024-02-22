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
        required: true,
        enum: ['male', 'female']
    },
    contact: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
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
    program: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        default: null
    },
    areaOfInterest: [{
        type: String,
    }],
    groupInvites: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    groupID: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
}, { timestamps: true });

const Student = models.Student || model('Student', studentSchema);
export default Student;