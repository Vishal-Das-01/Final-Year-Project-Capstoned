import { AccessType, FileType } from '@/constants/enums';
import { model, models, Schema } from 'mongoose';

const projectSchema = new Schema({
    proposedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    documents: [
        {
            file: {
                type: String,
                required: true
            },
            extension: {
                type: String,
                enum: Object.keys(FileType),
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: Object.keys(AccessType),
        required: true
    }  
},{timestamps: true})

const Project = models.Project || model('Project', projectSchema);
export default Project;
