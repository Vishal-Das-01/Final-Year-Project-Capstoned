import { model, models, Schema } from "mongoose";
import { DocFileType, Industry } from "@/constants/enums";

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
            required: true
        },
        extension: {
            type: String,
            enum: Object.keys(DocFileType),
            required: true
        }
    },
    industries: [{
        type: String,
        enum: Object.keys(Industry)
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