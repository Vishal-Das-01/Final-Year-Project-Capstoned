import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import Student from "@/models/Student";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const profileID = request.headers.get("profileID");
    const groupID = params.id;

    const mentor = await Mentor.findById(profileID).select("groups");

    for (const group of mentor.groups) {
      if (group.groupID == groupID) {
        const singleGroup = await Group.findById(group.groupID).populate(
          "supervisor mentors lead members",
          "firstName lastName"
        ).select('-selectedProposal');
        return NextResponse.json(
          { message: "Success.", role: group.role, data: singleGroup },
          { status: HttpStatusCode.Ok }
        );
      }
    }

    return NextResponse.json(
      { message: "No group found." },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to retrieve group." },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
