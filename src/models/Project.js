import { AccessType, DocFileType } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const projectSchema = new Schema({
    proposal: {
        type: Schema.Types.ObjectId,
        ref: 'Proposal',
        required: true
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    milestones: [
        {
            ID: {
                type: String,
                required: true,
                ref: 'Milestone'
            },
            completed:{
                type: Boolean
            },
            file: [
                {
                    doc: {
                        type: String,
                    },
                    extension: {
                        type: String,
                        enum: Object.values(DocFileType),
                        required: true
                    }
                }
            ],
            marks: [
                {
                    member: {
                        type: Schema.Types.ObjectId,
                        ref: 'Student'
                    },
                    marks: {
                        type: Number,
                        required: true,
                        min: 0,
                        max: 100
                    }
                }
            ]
        }
    ],
    status: {
        type: String,
        enum: Object.values(AccessType),
        default: AccessType.Private
    },
    finished: {
        type: Boolean,
        default: false
    },
    grade: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Project = models.Project || model('Project', projectSchema);
export default Project;
