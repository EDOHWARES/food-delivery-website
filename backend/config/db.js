import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://edohwares:edoh122333444455555..@cluster0.bpfzw4s.mongodb.net/food-del').then(() => console.log('DB CONNECTED!'));
};