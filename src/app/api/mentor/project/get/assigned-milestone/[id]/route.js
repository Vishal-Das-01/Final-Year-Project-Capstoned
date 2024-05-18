import AssignedMilestone from "@/models/AssignedMilestones";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const assignedMilestoneID = params.id;
    const assignedMilestone = await AssignedMilestone.findById(
      assignedMilestoneID
    ).populate("milestoneID");

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
