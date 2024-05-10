import Mentor from "@/models/Mentor";
import User from "@/models/User";
import { connectToDB } from "@/utils/helpers/connectDB";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function PATCH(request){
    connectToDB();

    try {
        const {officeHours, industries, roomNum, profileImage, occupation, company, bio} = await request.json();
        const profileID = request.headers.get('profileID');
        const email = request.headers.get('email');

        const mentor = await Mentor.findById(profileID)
        const user = await User.findOne({email: email});

        if (!mentor || !user) {
            return NextResponse.json({ message: 'Mentor not found' }, { status: HttpStatusCode.NotFound });
        }

        mentor.officeHours = officeHours
        mentor.industries = industries
        mentor.roomNum = roomNum
        mentor.occupation = occupation
        mentor.company = company
        mentor.bio = bio
        await mentor.save()

        user.profileImage = profileImage;
        await user.save();

        return NextResponse.json({ message: 'Mentor updated' }, { status: HttpStatusCode.Ok });
        
    } catch (error) {
        console.log(error)
        if(error.name === 'ValidationError')
            return NextResponse.json({ message: "Details not correct" }, { status: HttpStatusCode.BadRequest });
        return NextResponse.json({ message: error.message }, { status: HttpStatusCode.InternalServerError });        
        
    }
}