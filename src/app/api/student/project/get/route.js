import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Project from "@/models/Project";
import Student from "@/models/Student";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { populate } from "dotenv";
import AssignedMilestone from "@/models/AssignedMilestones";
import Proposal from "@/models/Proposal";
import Milestone from "@/models/Milestone";
import Mentor from "@/models/Mentor";

export async function GET(request) {
  connectToDB();

  try {
    const profileID = request.headers.get("profileID");

    const student = await Student.findById(profileID)
      .select("group")
      .populate({
        path: "group",
        select: "lead members project name supervisor",
        populate: { path: "supervisor", select: "firstName lastName" },
      });

    if (student.group === null)
      return NextResponse.json(
        { message: "Student not in a group" },
        { status: HttpStatusCode.BadRequest }
      );

    if (student.group.project === null)
      return NextResponse.json(
        { message: "Student has not finalized a project." },
        { status: HttpStatusCode.BadRequest }
      );

    let role;

    if (student.group.lead == profileID) role = "Group Lead";
    else role = "Group Member";

    const project = await Project.findById(student.group.project)
      .populate({path: "proposal", select: "title description proposalDoc", populate: {path: "proposedBy proposer", select: "firstName lastName"}})
      .populate({
        path: "milestones",
        select: "marked milestoneID",
        populate: { path: "milestoneID", select: "assignmentNumber" },
      });

    return NextResponse.json(
      {
        message: "Success",
        group: student.group,
        role: role,
        project: project,
      },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
