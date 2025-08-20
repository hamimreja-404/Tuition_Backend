import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async()=>{
    try {
        const connectionInstamce = await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
        console.log(`Database connected successfully: ${connectionInstamce.connection.host}`);
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1)
    }
}
export default connectDB;

