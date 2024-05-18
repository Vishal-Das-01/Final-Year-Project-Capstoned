import { DocFileType } from "@/utils/constants/enums";
import { model, models, Schema } from "mongoose";

const assignedMilestoneSchema = new Schema({
  milestoneID: {
    type: Schema.Types.ObjectId,
    ref: "Milestone",
    required: true,
  },
  projectID: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  obtainedMarks: {
    type: Number,
    min: 0,
    max: 100,
  },
  marked: {
    type: Boolean,
    default: false,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  submissionTime: {
    type: Date,
  },
  submissionFile: [
    {
      doc: {
        type: String,
      },
      extension: {
        type: String,
        enum: Object.values(DocFileType),
      },
    },
  ],
  marks: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
      marks: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  ]
}, { timestamps: true });

const AssignedMilestone = models.AssignedMilestone || model("AssignedMilestone", assignedMilestoneSchema);
export default AssignedMilestone;
