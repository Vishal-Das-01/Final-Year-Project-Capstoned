import { Gender, Industry, ImageFileType } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const mentorSchema = new Schema({
    isUniversityTeacher: {
        type: Boolean,
        required: true
    },
    canSupervise: {
        type: Boolean,
        required: true
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
        enum: Object.values(Gender),
        required: true
    },
    occupation: {
        type: String,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    bio: {
        type: String,
        default: null
    },
    industries: [{
        type: String,
        enum: Object.values(Industry)
    }],
    contact: {
        type: String,
        required: true
    },
    roomNum: {
        type: String,
        default: null
    },
    officeHours: {
        type: [{
            start: {
                type: String,
            },
            end: {
                type: String,
            },
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            }
        }],
        validator: function (value) {
            return value.length < 8;
        },
    },
    groups: [{
            group: {
                type: Schema.Types.ObjectId,
                ref: 'Group'
            },
            project: {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            },
        }],
    myProposals: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Proposal'
        }],
        validate: function (value) {
            return value.length < 6;
        }
    },
    pastProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    profileImage: {
        image: {
            type: String,
            required: true
        },
        extension: {
            type: String,
            enum: Object.values(ImageFileType),
            required: true
        }
    },
}, { timestamps: true })

const Mentor = models.Mentor || model('Mentor', mentorSchema);
export default Mentor;
