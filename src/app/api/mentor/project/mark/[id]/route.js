import { connectToDB } from "@/utils/helpers/connectDB";
import Project from "@/models/Project";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import AssignedMilestone from "@/models/AssignedMilestones";

export async function PATCH(request, { params }) {
  await connectToDB();

  try {
    const assignedMilestoneID = params.id;
    const profileID = request.headers.get("profileID");
    const marks = await request.json();

    const assignedMilestone = await AssignedMilestone.findById(
      assignedMilestoneID
    ).populate({
      path: "projectID",
      select: "group",
      populate: { path: "group", select: "supervisor" },
    });

    if (assignedMilestone.projectID.group.supervisor != profileID) {
      return NextResponse.json(
        { message: "You are forbidden from marking this milestone" },
        { status: HttpStatusCode.Forbidden }
      );
    }

    assignedMilestone.marks = marks;
    assignedMilestone.marked = true;
    await assignedMilestone.save();

    return NextResponse.json(
      { message: "Milestone marked" },
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
