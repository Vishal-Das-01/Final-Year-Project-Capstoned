import { connectToDB } from "@/utils/helpers/connectDB";
import Milestone from "@/models/Milestone";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDB();

  try {
    const year = request.nextUrl.searchParams.get("page")

    console.log(year)

    if (year) {
      const milestones = await Milestone.find({ year: year });
      return NextResponse.json(milestones, { status: HttpStatusCode.Ok });
    }

    const milestones = await Milestone.find();
    return NextResponse.json(milestones, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
