import { connectToDB } from "@/utils/helpers/connectDB";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        await connectToDB();

        try {
            const { receiver, ...body } = req.body;
            const profileID = req.headers.profileid;
            
            return res.status(200).json({ message: 'Chat created.' });
        } catch (error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({ message: 'Please provide correct/necessary fields.' });
            }
            return res.status(500).json({ message: 'Failed to create chat.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}