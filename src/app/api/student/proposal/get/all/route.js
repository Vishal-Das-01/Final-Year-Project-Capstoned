import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  await connectToDB();

  try {
    const profileID = request.headers.get("profileID");

    const { page, limit, skip } = paginationParams({
      page: request.nextUrl.searchParams.get("page"),
      limit: request.nextUrl.searchParams.get("limit"),
    });
    const student = await Student.findById(profileID);

    if (student.group == null)
      return NextResponse.json(
        { message: "Student must be in a group." },
        { status: HttpStatusCode.NotFound }
      );

    const proposals = await Proposal.find({ available: true })
      .skip(skip)
      .limit(limit);

    const totalProposals = await Proposal.countDocuments({ available: true, proposer: "Mentor"});
    const totalPages = Math.ceil(totalProposals / limit);

    return NextResponse.json(
      {
        message: "Success.",
        data: { page, totalProposals, totalPages, proposals },
      },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to retrieve proposals." },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
