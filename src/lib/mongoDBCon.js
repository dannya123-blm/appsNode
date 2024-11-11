import { MongoClient } from 'mongodb';

const uri = process.env.DB_URI; 
const client = new MongoClient(uri);

let dbConnection;

async function connectToDatabase() {
    if (!dbConnection) {
        try {
            await client.connect();
            dbConnection = client.db('KrispyDB'); 
        } catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    }
    return dbConnection;
}

export default connectToDatabase;
