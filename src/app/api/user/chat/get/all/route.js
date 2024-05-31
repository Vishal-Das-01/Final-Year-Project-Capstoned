import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Chat from "@/models/Chat";
import { paginationParams } from "@/utils/helpers/paginationParams";
import Mentor from "@/models/Mentor";
import Student from "@/models/Student";
import Message from "@/models/Message";

export const GET = async (request) => {
    await connectToDB();
    const profileID = request.headers.get('profileID');

    try {
        // const { page, limit, skip } = paginationParams(
        //     {page: request.nextUrl.searchParams.get('page'), limit: request.nextUrl.searchParams.get('limit')}
        // )

        const chats = await Chat.find({ 'participants.participant': profileID }).populate(
            'participants.participant', 'firstName lastName gender profileImage'
        ).populate({
            path: 'messages',
            options: { sort: { createdAt: -1 }, limit: 1 }, 
            populate: {
                path: 'sender',
                select: 'firstName lastName gender profileImage'
            }
        })
        // .skip(skip).limit(limit);

        // const totalChats = await Chat.countDocuments({ "participants.participant": profileID });
        // const totalPages = Math.ceil(totalChats/limit);

        // return NextResponse.json({message: "Success.", data: {page, totalChats, totalPages, chats}}, {status: HttpStatusCode.Ok});
        return NextResponse.json({ message: "Success.", data: chats }, { status: HttpStatusCode.Ok });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to retrieve chats." }, { status: HttpStatusCode.InternalServerError });
    }
}