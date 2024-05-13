import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";
import Chat from "@/models/Chat";

export const GET = async (request) => {
    await connectToDB();

    try {
        const chatID = request.nextUrl.searchParams.get('id');
        const chat = await Chat.findById(chatID).populate(
            'participants.participant', 'firstName lastName gender profileImage'
        ).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'firstName lastName gender profileImage'
            }
        });
        if(!chat) {
            return NextResponse.json({message: "Chat not found."}, {status: HttpStatusCode.NotFound});
        }

        return NextResponse.json({message: "Success.", data: chat}, {status: HttpStatusCode.Ok});
    } catch (error) {
        return NextResponse.json({message: "Failed to retrieve chat."}, {status: HttpStatusCode.InternalServerError});
    }
}