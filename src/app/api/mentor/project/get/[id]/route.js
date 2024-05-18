import Project from "@/models/Project";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Mentor from "@/models/Mentor";
import Proposal from "@/models/Proposal";
import AssignedMilestone from "@/models/AssignedMilestones";
import Milestone from "@/models/Milestone";

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const profileID = request.headers.get("profileID");
    const projectID = params.id;
    const project = await Project.findById(projectID)
      .populate({path: "milestones", select: 'milestoneID marked',populate: {path: "milestoneID", select: "assignmentNumber"}})
      .populate("group", "name mentors supervisor")
      .populate(
        "proposal",
        "title description proposedBy proposer proposalDoc"
      );

    let proposedBy;
    if (project.proposal.proposer === "Mentor") {
      const proposal = await Proposal.findById(project.proposal._id)
        .select("proposedBy proposer")
        .populate("proposedBy", "firstName lastName");
      proposedBy = `${proposal.proposedBy.firstName} ${proposal.proposedBy.lastName}`;
    } else {
      proposedBy = project.group.name;
    }

    if (
      !project.group.mentors.includes(profileID) &&
      project.group.supervisor != profileID
    ) {
      return NextResponse.json(
        { message: "You are forbidden from accessing this project" },
        { status: HttpStatusCode.Forbidden }
      );
    }

    let role;
    if (profileID == project.group.supervisor) {
      role = "Supervisor";
    } else if (project.group.mentors.includes(profileID)) {
      role = "Mentor";
    }

    return NextResponse.json(
      { message: "Success", data: { project, role, proposedBy } },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
