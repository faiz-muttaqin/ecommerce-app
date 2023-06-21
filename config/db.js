import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);
    }catch (err) {
        console.error(`Error: ${err.message}`.bgRed.white);
        process.exit(1);
    }

}
export default connectDB;