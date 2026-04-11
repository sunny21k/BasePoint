import { Schema, model, models, Types } from "mongoose";

export interface IReview {
    businessId: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number;
    comment: string;
    reviewerName?: string;
    reviewerAvatar?: string;
    isVerified?: boolean;
    isPublished?: boolean;
}

const reviewSchema = new Schema<IReview>(
    {
        businessId: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        reviewerName: {
            type: String,
            default: "",
            trim: true,
        },
        reviewerAvatar: {
            type: String,
            default: "",
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Review = models.Review || model<IReview>("Review", reviewSchema);
export default Review;