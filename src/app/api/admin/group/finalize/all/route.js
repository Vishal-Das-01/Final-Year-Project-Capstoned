import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        await Group.updateMany({}, { confirmed: true });

        return NextResponse.json({message: "Groups finalized."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to finalize groups."}, {status: HttpStatusCode.InternalServerError});
    }
}