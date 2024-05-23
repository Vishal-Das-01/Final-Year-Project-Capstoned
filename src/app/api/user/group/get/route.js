import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Student from "@/models/Student";
import Proposal from "@/models/Proposal";

export const GET = async (request) => {
  await connectToDB();

  try {
    const groupID = request.nextUrl.searchParams.get("id");
    const group = await Group.findById(groupID)
      .populate("lead", "firstName lastName")
      .populate("members", "firstName lastName")
      .populate("supervisor", "firstName lastName")
      .populate("mentors", "firstName lastName")
      .populate({
        path: "selectedProposal",
        populate: {
          path: "proposal",
          select: "proposalDoc title",
        },
      });
    
    if (!group) {
      return NextResponse.json(
        { message: "Group not found." },
        { status: HttpStatusCode.NotFound }
      );
    }

    return NextResponse.json(
      { message: "Success.", data: group },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to retrieve group." },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
