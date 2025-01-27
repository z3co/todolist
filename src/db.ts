import mongoose from "mongoose";

const localDB: string = "mongodb://localhost:27017/role_auth";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(localDB, {
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;

