import { model, models, Schema } from "mongoose";
import { DocFileType, Industry } from '@/utils/constants/enums';

const proposalSchema = new Schema({
    proposer: {
        type: String,
        enum: ["Group", "Mentor"],
        required: true
    },
    proposedBy: {
        type: Schema.Types.ObjectId,
        refPath: 'proposer',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    proposalDoc: {
        file: {
            type: String,
        },
        extension: {
            type: String,
            enum: Object.values(DocFileType),
        }
    },
    industries: [{
        type: String,
        enum: Object.values(Industry)
    }],
    mentorship: {
        type: Boolean,
        default: false
    },
    edit: {
        type: Boolean,
        default: true
    },
    selectedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Proposal = models.Proposal || model("Proposal", proposalSchema);
export default Proposal;