import Group from "@/models/Group";
import Milestone from "@/models/Milestone";
import Notification from "@/models/Notification";
import { NotificationType } from "@/utils/constants/enums";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectToDB();

    try {
        const profileID = request.headers.get("profileID");

        var year = new Date().getFullYear();
        const month = new Date().getMonth();

        if (month > 6) {
            year = year + 1;
        }

        const numOfGroups = await Group.countDocuments({ year: year });

        const notifications = await Notification.find({ sender: { $ne: null }, type: NotificationType.ToAll }).select("headline description createdAt").sort({ createdAt: -1 }).limit(5);
        const numOfNotifications = notifications.length;

        const currentDate = new Date();

        const milestone = await Milestone.find({
            year: year,
            assigned: true,
            deadline: { $gt: currentDate },
        }).select("assignmentNumber title deadline").sort({ deadline: 1 }).limit(1);

        return NextResponse.json(
            { message: "Success", numOfGroups, numOfNotifications, notifications, milestone: milestone[0] },
            { status: HttpStatusCode.Ok }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message },
            { status: HttpStatusCode.InternalServerError }
        );
    }
}

