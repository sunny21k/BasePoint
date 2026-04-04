import { Schema, model, models } from "mongoose";

export interface IBusiness {
    ownerName: string;
    businessName: string;
    email: string;
    phone: string;
    businessType?: string;
    businessAddress?: string;
    websiteOrSocial?: string;
    description?: string;
    accountStatus: "pending" | "approved" | "rejected";
}

const businessSchema = new Schema<IBusiness>(
    {
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
            required: false,
            trim: true,
            default: "",
        },
        businessAddress: {
            type: String,
            required: false,
            trim: true,
            default: "",
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
        accountStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Business = models.Business || model<IBusiness>("Business", businessSchema);

export default Business;