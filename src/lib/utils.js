const { default: mongoose } = require("mongoose")

const connection = {};

export const connectToDB = async () => {
    try {
        if (connection.isConnected) {
            console.log('Using existing connection');
            return;
        }
        const db = await mongoose.connect(process.env.MONGODB_URI,
            {
                user: process.env.USER,
                pass: process.env.PASSWORD,
                dbName: 'Project-DataBase',
            })
        connection.isConnected = db.connections[0].readyState;
        console.log("server connected to database...");
    } catch (error) {
        console.log('Error connecting to the database', error);
        throw new Error(error);
    }
}

