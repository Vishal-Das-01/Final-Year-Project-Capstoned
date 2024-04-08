import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Company from "@/models/Company";

export const GET = async (request) => {
    await connectToDB();

    try {
        const companyID = request.nextUrl.searchParams.get('id');
        const company = await Company.findById(companyID);
        if(!company) {
            return NextResponse.json({message: "Company not found."}, {status: HttpStatusCode.NotFound});
        }

        return NextResponse.json({message: "Success.", data: company}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve company."}, {status: HttpStatusCode.InternalServerError});
    }
}