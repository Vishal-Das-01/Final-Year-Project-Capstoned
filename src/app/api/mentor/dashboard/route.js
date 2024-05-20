import Mentor from "@/models/Mentor";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import Group from "@/models/Group";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { populate } from "dotenv";
import Milestone from "@/models/Milestone";

export async function GET(request) {
    await connectToDB();

    try {
        const profileID = request.headers.get("profileID");
        const year = request.nextUrl.searchParams.get("year");

        const mentor = await Mentor.findById(profileID)
            .select("myProposals groups firstName lastName")
            .populate("myProposals", "title edit")
            .populate({
                path: "groups.groupID",
                select: "members lead project name",
                populate: [
                    { path: "lead members", select: "profileImage" },
                    {
                        path: "project",
                        select: "progress proposal",
                        populate: { path: "proposal", select: "title" },
                    },
                ],
            });

        const currentDate = new Date();
        const milestone = await Milestone.find({
            year: year,
            assigned: true,
            deadline: { $gt: currentDate },
        })
            .select("assignmentNumber title deadline")
            .sort({ deadline: 1 })
            .limit(1);


        return NextResponse.json(
            { message: "Success", data: mentor, milestone },
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
