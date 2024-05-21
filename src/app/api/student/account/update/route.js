import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";

export async function PATCH(request) {
  connectToDB();

  try {
    const { resume, industriesOfInterest, profileImage } = await request.json();
    const profileID = request.headers.get("profileID");
    const email = request.headers.get("email");

    const student = await Student.findById(profileID);

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    if (resume && industriesOfInterest) {
      student.resume = resume;
      student.industriesOfInterest = industriesOfInterest;
    }

    if(profileImage)
        student.profileImage = profileImage;
    
    await student.save();

    return NextResponse.json(
      { message: "Student updated" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    if (error.name === "ValidationError")
      return NextResponse.json(
        { message: "Details not correct" },
        { status: HttpStatusCode.BadRequest }
      );
    return NextResponse.json(
      { message: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
