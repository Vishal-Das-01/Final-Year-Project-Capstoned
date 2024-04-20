import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import Notification from "@/models/Notification";

export const GET = async (request) => {
    await connectToDB();
    const profileID = request.headers.get('profileID');

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const notifications = await Notification.find({
            $or: [
              { type: { $in: ['To All', 'To Students'] } },
              { type: 'To Individual', receiver: profileID }
            ],
            activated: true
        }).select('-sender').skip(skip).limit(limit);

        const totalNotifications = await Notification.countDocuments({
            $or: [
              { type: { $in: ['To All', 'To Students'] } },
              { type: 'To Individual', receiver: profileID }
            ],
            activated: true
        });
        const totalPages = Math.ceil(totalNotifications/limit);

        return NextResponse.json({message: "Success.", data: {page, totalNotifications, totalPages, notifications}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve notifications."}, {status: HttpStatusCode.InternalServerError});
    }
}