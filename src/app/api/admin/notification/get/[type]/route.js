import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import { paginationParams } from "@/utils/helpers/paginationParams";
import Notification from "@/models/Notification";
import { NotificationType } from "@/utils/constants/enums";

export const GET = async (request, { params }) => {
    await connectToDB();

    try {
        const { page, limit, skip } = paginationParams(
            {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        )

        const query = NotificationTypeToQuery[params.type]
        if(!query) {
            return NextResponse.json({ message: "Invalid request." }, { status: HttpStatusCode.BadRequest });
        }

        const notifications = await Notification.find(query).skip(skip).limit(limit).populate(
            'sender', 'firstName lastName profileImage'
        ).populate('receiver', 'firstName lastName profileImage');

        const totalNotifications = await Notification.countDocuments(query);
        const totalPages = Math.ceil(totalNotifications/limit);

        return NextResponse.json({message: "Success.", data: {page, totalNotifications, totalPages, notifications}}, {status: HttpStatusCode.Ok});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to retrieve notifications."}, {status: HttpStatusCode.InternalServerError});
    }
}

const NotificationTypeToQuery = {
    all: {},
    students: { type: NotificationType.ToStudents },
    mentors: { type: NotificationType.ToMentors },
    admins: { type: NotificationType.ToAdmins },
    individual: { type: NotificationType.ToIndividual }
};