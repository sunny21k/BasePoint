import { Schema, model, models } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    role: "business" | "customer" | "admin";
    accountStatus: "pending" | "approved" | "rejected";
    verificationStatus: "not_submitted" | "submitted";
    businessName?: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["business", "customer", "admin"],
            required: true,
            default: "business",
        },
        accountStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            required: true,
            default: "pending",
        },
        verificationStatus: {
            type: String,
            enum: ["not_submitted", "submitted"],
            required: true,
            default: "not_submitted",
        },
        businessName: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;