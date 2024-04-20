import { connectToDB } from "@/utils/helpers/connectDB";
import Request from "@/models/Request";

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        await connectToDB();

        try {
            const requestToDelete = await Request.findById(req.query.id);
            if(!requestToDelete) {
                return res.status(404).json({ message: 'Request not found.' });
            }

            if(requestToDelete.receiver!=req.headers.profileid) {
                return res.status(403).json({ message: 'Unauthorized.' });
            }

            await Request.findByIdAndDelete(req.query.id);

            if(res.socket.server.io) {
                res.socket.server.io.emit(`request:delete:${requestToDelete.sender}`, requestToDelete);
            }
        
            return res.status(200).json({ message: 'Request declined.' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to decline request.' });
        }
    }
    else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
}