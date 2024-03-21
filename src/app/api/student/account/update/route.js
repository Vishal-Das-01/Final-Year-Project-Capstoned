import Student from "@/models/Student";
import User from "@/models/User";
import { NextResponse } from "next/server";
import HttpStatusCode from "axios";
import { connectToDB } from "@/utils/helpers/connectDB";

export async function PATCH(request){
    connectToDB();

    try {
        const {resume, industriesOfInterest, profileImage} = await request.json();
        const profileID = request.headers.get('profileID');
        const email = request.headers.get('email');

        const student = await Student.findById(profileID);
        student.resume = resume;
        student.industriesOfInterest = industriesOfInterest;
        await student.save();
        
        const user = await User.findOne({email: email});
        user.profileImage = profileImage;
        await user.save();

        if (!student || !user) {
            return NextResponse.json({ message: 'Student not found' }, { status: HttpStatusCode.NOT_FOUND });
        }

        return NextResponse.json({ message: 'Student updated' }, { status: HttpStatusCode.OK });

    } catch (error) {
        if(error.name === 'ValidationError')
            return NextResponse.json({ message: "Details not correct" }, { status: HttpStatusCode.BAD_REQUEST });
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.INTERNAL_SERVER_ERROR });        
    }
}