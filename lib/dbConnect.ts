import env from '@/app/constant/env';
import mongoose from 'mongoose';


const connectToMongo = async (): Promise<void> => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(env.MONGODB_URI);
            console.log('✅ MongoDB connected');
        } else {
            console.log('✅ MongoDB already connected');

        }

    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};


export default connectToMongo;