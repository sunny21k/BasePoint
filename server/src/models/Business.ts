import { Schema, model, models, Types } from "mongoose";

export interface IBusiness {
    userId: Types.ObjectId;
    ownerName: string;
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    businessAddress: string;
    websiteOrSocial?: string;
    description?: string;
    isOnBoarded: boolean;
}

const businessSchema = new Schema<IBusiness>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ownerName: {
            type: String,
            required: true,
            trim: true,
        },
        businessName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        businessType: {
            type: String,
            required: true,
            trim: true,
        },
        businessAddress: {
            type: String,
            required: true,
            trim: true,
        },
        websiteOrSocial: {
            type: String,
            trim: true,
            default: "",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        isOnBoarded: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);

const Business = models.Business || model<IBusiness>("Business", businessSchema);

export default Business;