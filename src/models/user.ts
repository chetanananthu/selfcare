import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: string;
}

const userSchema = new Schema<User>({
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" }
});

export const UserModel = mongoose.model<User>("User", userSchema);
