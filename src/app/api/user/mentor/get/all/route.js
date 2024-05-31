import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Mentor from "@/models/Mentor";
import { paginationParams } from "@/utils/helpers/paginationParams";
import Company from "@/models/Company";

export const GET = async (request) => {
    await connectToDB();

    try {

        const supervisor = request.nextUrl.searchParams.get('supervisor');

        const search = request.nextUrl.searchParams.get('search');

        const { page, limit, skip } = paginationParams(
            { page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit') }
        )

        let mentors;
        let totalMentors;
        let totalPages;

        if (supervisor) {
            mentors = await Mentor.find({ canSupervise: true, firstName: { $regex: search, $options: "i" } }).
                select('firstName lastName gender isUniversityTeacher canSupervise occupation profileImage groups officeHours roomNum company industries')
                .populate('company', 'name')
                .sort({ firstName: 1 }).skip(skip).limit(limit);
            totalMentors = await Mentor.countDocuments({ canSupervise: true, firstName: { $regex: search, $options: "i" } });
            totalPages = Math.ceil(totalMentors / limit);
        }
        else {
            mentors = await Mentor.find({ firstName: { $regex: search, $options: "i" } }).
                select('firstName lastName gender isUniversityTeacher canSupervise occupation profileImage groups officeHours roomNum company industries')
                .populate('company', 'name')
                .sort({ firstName: 1 }).skip(skip).limit(limit);
            totalMentors = await Mentor.countDocuments({ firstName: { $regex: search, $options: "i" } });
            totalPages = Math.ceil(totalMentors / limit);
        }

        return NextResponse.json({ message: "Success.", data: { page, totalMentors, totalPages, mentors } }, { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to retrieve mentors." }, { status: HttpStatusCode.InternalServerError });
    }
}