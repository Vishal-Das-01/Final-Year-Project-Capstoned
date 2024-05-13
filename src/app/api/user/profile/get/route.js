import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import User from "@/models/User";

export const GET = async (request) => {
    await connectToDB();

    try {
        const profileID = request.nextUrl.searchParams.get('id');
        const user = await User.findOne({ profileID }).select('email role profileID').populate({
            path: 'profileID',
            select: '-createdAt -updatedAt -__v',
            populate: {
                path: 'group',
                select: 'name'
            }
        });
        if(!user) {
            return NextResponse.json({message: "User not found."}, {status: HttpStatusCode.NotFound});
        }

        return NextResponse.json({message: "Success.", data: user}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve user."}, {status: HttpStatusCode.InternalServerError});
    }
}