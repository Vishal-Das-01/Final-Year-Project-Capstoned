import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Company from "@/models/Company";

export const POST = async (request) => {
    await connectToDB();
    const body = await request.json();

    try {
        const company=new Company(body);
        await company.save();

        return NextResponse.json({message: "Company registered."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json({ message: "Please provide correct/necessary fields." }, { status: HttpStatusCode.BadRequest });
        }
        return NextResponse.json({message: "Failed to register company."}, {status: HttpStatusCode.InternalServerError});
    }
}