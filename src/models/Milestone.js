import { model, models, Schema } from "mongoose";

const milestoneSchema = new Schema({
    assignmentNumber: {
        type: Number,
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
    deadline: {
        type: Date,
        required: true
    },
    percentage: {
        type: Number,
        required: true,
        max: 100,
        min: 0
    },
    resources: [
        {
            name: {
                type: String,
            },
            file: {
                type: String,
            },
            extension: {
                type: String,
                enum: [".pdf", ".docx", ".pptx", ".xlsx", ".zip", ".rar", '.jpg', '.jpeg', '.png'],
            }
        }
    ],
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Milestone = models.Milestone || model("Milestone", milestoneSchema);
export default Milestone;