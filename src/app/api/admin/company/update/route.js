import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Company from "@/models/Company";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const companyID = request.nextUrl.searchParams.get('id');
        const body = await request.json();

        const company = await Company.findById(companyID);
        if (!company) {
            return NextResponse.json({ message: "Company not found." }, { status: HttpStatusCode.NotFound });
        }

        Object.assign(company, body);

        await company.save();

        return NextResponse.json({message: "Company updated."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to update company."}, {status: HttpStatusCode.InternalServerError});
    }
}