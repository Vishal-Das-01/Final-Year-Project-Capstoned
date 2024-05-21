import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  connectToDB();

  try {
    const {
      officeHours,
      industries,
      roomNum,
      profileImage,
      occupation,
      company,
      bio,
    } = await request.json();
    const profileID = request.headers.get("profileID");
    const email = request.headers.get("email");

    const mentor = await Mentor.findById(profileID);

    if (!mentor) {
      return NextResponse.json(
        { message: "Mentor not found" },
        { status: HttpStatusCode.NotFound }
      );
    }

    if (officeHours && industries && roomNum && occupation && company && bio) {
      mentor.officeHours = officeHours;
      mentor.industries = industries;
      mentor.roomNum = roomNum;
      mentor.occupation = occupation;
      mentor.company = company;
      mentor.bio = bio;
    }
    if (profileImage) mentor.profileImage = profileImage;
    await mentor.save();

    return NextResponse.json(
      { message: "Mentor updated" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    console.log(error);
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
