import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import Mentor from "@/models/Mentor";

export async function GET(request, response) {
  await connectToDB();

  try {
    const profileID = request.headers.get("profileID");

    const { page, limit, skip } = paginationParams({
      page: request.nextUrl.searchParams.get("page"),
      limit: request.nextUrl.searchParams.get("limit"),
    });
    const student = await Student.findById(profileID);

    const proposals = await Proposal.find({ edit:true, available: true, proposer: "Mentor"})
      .populate("proposedBy", 'firstName lastName isUniversityTeacher')
      .collation({locale: "en" })
      .sort({ title: 1})
      .skip(skip)
      .limit(limit);

    const totalProposals = await Proposal.countDocuments({ edit:true, available: true, proposer: "Mentor"});
    const totalPages = Math.ceil(totalProposals / limit);

    return NextResponse.json(
      {
        message: "Success.",
        data: { page, totalProposals, totalPages, group: student.group, proposals },
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
