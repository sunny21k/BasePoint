import {Schema, model, models} from 'mongoose';

export interface IUser {
    email: String;
    password: string;
    role: "business" | "customer" | "admin";
    accountStatus: "active" | "suspended" | "pending";
    businessName?: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    password: {
        type: String, 
        required: true,
        select: false
    },
    role: {
        type: String, 
        enum: ["business", "customer", "admin"],
        required: true, 
        default: "business"
    },
    accountStatus: {
        type: String, 
        enum: ["active", "suspended", "pending"],
        required: true, 
        default: "pending"
    },
    businessName: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;