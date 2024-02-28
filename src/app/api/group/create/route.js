import { connectToDB } from "@/lib/utils";
import Group from "@/models/Group";
import Student from "@/models/Student";

export const POST = async (req, res) => {
    await connectToDB();
    const { studentId, name, profileImage } = await req.json();

    try {
        const student = await Student.findById(studentId);
        if(!student) {
            return new Response("Student not found.", { status: 404 });
        }

        const group=new Group({lead: studentId, name, profileImage});
        await group.save();

        student.group=group._id;
        await student.save();

        return new Response("Group registered successfully!", { status: 201 });
    } catch (error) {
        return new Response("Failed to register group", { status: 500 });
    }
}