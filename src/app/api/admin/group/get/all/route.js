import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";

export const GET = async (request) => {
    await connectToDB();

    try {
        const groups = await Group.find();

        return NextResponse.json({message: "Success.", data: groups}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve groups."}, {status: HttpStatusCode.InternalServerError});
    }
}