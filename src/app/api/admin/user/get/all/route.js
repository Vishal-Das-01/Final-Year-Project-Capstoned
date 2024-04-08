import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";
import { paginationParams } from "@/utils/helpers/paginationParams";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const users = await User.find().select('-password').skip(skip).limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers/limit);

        return NextResponse.json({message: "Success.", data: {page, totalUsers, totalPages, users}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve users."}, {status: HttpStatusCode.InternalServerError});
    }
}