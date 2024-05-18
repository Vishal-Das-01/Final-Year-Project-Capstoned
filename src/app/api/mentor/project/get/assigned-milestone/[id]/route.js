import AssignedMilestone from "@/models/AssignedMilestones";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Group from "@/models/Group";
import Student from "@/models/Student";

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const assignedMilestoneID = params.id;
    const assignedMilestone = await AssignedMilestone.findById(
      assignedMilestoneID
    ).populate("milestoneID").populate("marks.member", "firstName lastName");

    return NextResponse.json(
      {
        message: "Success",
        data: assignedMilestone,
      },
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
