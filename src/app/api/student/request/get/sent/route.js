import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Request from "@/models/Request";

export const GET = async (request) => {
    await connectToDB();
    const profileID = request.headers.get('profileID');

    try {
        const sentRequests = await Request.find({sender: profileID}).populate(
            'receiver', 'firstName lastName gender profileImage'
        );

        return NextResponse.json({message: "Success.", data: sentRequests}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve requests."}, {status: HttpStatusCode.InternalServerError});
    }
}