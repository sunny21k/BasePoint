import { Schema, model, models } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    role: "business" | "customer";
    accountStatus: "active" | "suspended" | "pending";
    ownerName?: string;
    businessName?: string;
    phone?: string;
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
            enum: ["business", "customer"],
            required: true,
        },
        accountStatus: {
            type: String,
            enum: ["active", "suspended", "pending"],
            required: true,
            default: "pending",
        },
        ownerName: {
            type: String,
            trim: true,
            default: "",
        },
        businessName: {
            type: String,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;