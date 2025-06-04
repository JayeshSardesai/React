import mongoose from "mongoose";
const { Schema, model } = mongoose
const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    username: { type: String },
    profilepic: { type: String },
    coverpic: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const User = mongoose.models.User || model("User", UserSchema);
export default User;
