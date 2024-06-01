import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Notification from "@/models/Notification";

export const PATCH = async (request) => {
    await connectToDB();

    try {
        const notificationID = request.nextUrl.searchParams.get('id');

        const notification = await Notification.findById(notificationID);
        if(!notification) {
            return NextResponse.json({ message: "Notification not found." }, { status: HttpStatusCode.NotFound });
        }

        notification.read = true

        await notification.save();

        return NextResponse.json({message: "Notification marked read."}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to mark notification read."}, {status: HttpStatusCode.InternalServerError});
    }
}