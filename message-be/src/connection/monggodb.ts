import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => { 
  try {
    await mongoose.connect(process.env.DB_URL || '');
    console.log('Đã kết nối MongoDB');
  } catch (err) {
    console.error('Kết nối MongoDB thất bại:', (err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
