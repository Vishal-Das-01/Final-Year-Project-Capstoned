import Student from "@/models/Student";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";

export async function PATCH(request){
    connectToDB();

    try {
        const {resume, industriesOfInterest, profileImage} = await request.json();
        const profileID = request.headers.get('profileID');
        const email = request.headers.get('email');

        const student = await Student.findById(profileID);
        const user = await User.findOne({email: email});

        if (!student || !user) {
            return NextResponse.json({ message: 'Student not found' }, { status: HttpStatusCode.NotFound });
        }

        student.resume = resume;
        student.industriesOfInterest = industriesOfInterest;
        await student.save();
        
        user.profileImage = profileImage;
        await user.save();

        return NextResponse.json({ message: 'Student updated' }, { status: HttpStatusCode.Ok });

    } catch (error) {
        if(error.name === 'ValidationError')
            return NextResponse.json({ message: "Details not correct" }, { status: HttpStatusCode.BadRequest });
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });        
    }
}