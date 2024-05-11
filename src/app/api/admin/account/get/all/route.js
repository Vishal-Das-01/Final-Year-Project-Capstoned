import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import User from "@/models/User";
import Mentor from "@/models/Mentor";
import Admin from "@/models/Admin";
import Student from "@/models/Student";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const users = await User.find().skip(skip).limit(limit).populate('profileID');

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers/limit);

        return NextResponse.json({message: "Success.", data: {page, totalUsers, totalPages, users}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve users."}, {status: HttpStatusCode.InternalServerError});
    }
}