import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import { paginationParams } from "@/utils/helpers/paginationParams";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const groups = await Group.find().skip(skip).limit(limit);

        const totalGroups = await Group.countDocuments();
        const totalPages = Math.ceil(totalGroups/limit);

        return NextResponse.json({message: "Success.", data: {page, totalGroups, totalPages, groups}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve groups."}, {status: HttpStatusCode.InternalServerError});
    }
}