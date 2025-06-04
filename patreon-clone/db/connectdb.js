import mongoose from "mongoose";
const connectdb = async () => {
    try {
        if (mongoose.connections[0].readyState === 0) {
            await mongoose.connect("mongodb://localhost:27017/Fund");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
export default connectdb;