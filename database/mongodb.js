import mongoose from "mongoose";

const connectToDatabase = async (url) => {

    try{
        await mongoose.connect(url);
        console.log(`✅ Database connected successfully!`);
    }catch(err){
        console.log("❌ Database connection failed:", err);
    }

}

export default connectToDatabase;