import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import Company from "@/models/Company";

export const GET = async (request) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const companies = await Company.find().select('name profileImage verified').skip(skip).limit(limit);

        const totalCompanies = await Company.countDocuments();
        const totalPages = Math.ceil(totalCompanies/limit);

        return NextResponse.json({message: "Success.", data: {page, totalCompanies, totalPages, companies}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve mentors."}, {status: HttpStatusCode.InternalServerError});
    }
}