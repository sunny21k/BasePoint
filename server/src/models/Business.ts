import { Schema, model, models, Types } from "mongoose";

export interface IBusinessFAQ {
    question: string;
    answer: string;
}

export interface IBusinessService {
    name: string;
    price?: string;
    duration?: string;
}

export interface IBusinessGalleryImage {
    url: string;
    alt?: string;
}

export interface IBusiness {
    userId: Types.ObjectId;
    ownerName: string;
    businessName: string;
    slug: string;
    tagline?: string;
    category?: string;
    email: string;
    phone: string;
    businessType: string;
    businessAddress: string;
    serviceArea?: string;
    websiteOrSocial?: string;
    bookingLink?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    description?: string;
    isOnBoarded: boolean;
    isPublished: boolean;
    isFeatured: boolean;
    isVerified: boolean;
    ratingAverage: number;
    reviewCount: number;
    attributes: string[];
    services: IBusinessService[];
    faq: IBusinessFAQ[];
    galleryImages: IBusinessGalleryImage[];
    holidayHours?: string;
    preferences?: {
        bookingType: "in-person" | "online" | "both";
        bufferTime: number;
        allowCancellations: boolean;
        cancellationFee: number;
        cancellationFeeType: "dollar" | "percent";
        cancellationWindow: number;
    };
    hours?: {
        [day: string]: {
            open: string;
            close: string;
            isOpen: boolean;
        };
    };
}

const businessFAQSchema = new Schema<IBusinessFAQ>(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const businessServiceSchema = new Schema<IBusinessService>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
            default: "",
        },
        duration: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);

const galleryImageSchema = new Schema<IBusinessGalleryImage>(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        alt: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);

const businessSchema = new Schema<IBusiness>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
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
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        tagline: {
            type: String,
            trim: true,
            default: "",
        },
        category: {
            type: String,
            trim: true,
            default: "",
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
        serviceArea: {
            type: String,
            default: "",
            trim: true,
        },
        websiteOrSocial: {
            type: String,
            trim: true,
            default: "",
        },
        bookingLink: {
            type: String,
            trim: true,
            default: "",
        },
        instagram: {
            type: String,
            trim: true,
            default: "",
        },
        facebook: {
            type: String,
            trim: true,
            default: "",
        },
        tiktok: {
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
        isPublished: {
            type: Boolean,
            default: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        ratingAverage: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        attributes: {
            type: [String],
            default: [],
        },
        services: {
            type: [businessServiceSchema],
            default: [],
        },
        faq: {
            type: [businessFAQSchema],
            default: [],
        },
        galleryImages: {
            type: [galleryImageSchema],
            default: [],
        },
        holidayHours: {
            type: String,
            default: "",
        },
        preferences: {
            type: {
                bookingType: {
                    type: String,
                    enum: ["in-person", "online", "both"],
                    default: "in-person",
                },
                bufferTime: {
                    type: Number,
                    default: 0,
                },
                allowCancellations: {
                    type: Boolean,
                    default: true,
                },
                cancellationFee: {
                    type: Number,
                    default: 0,
                },
                cancellationFeeType: {
                    type: String,
                    enum: ["dollar", "percent"],
                    default: "dollar",
                },
                cancellationWindow: {
                    type: Number,
                    default: 0,
                },
            },
            default: {},
        },
        hours: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

const Business = models.Business || model<IBusiness>("Business", businessSchema);
export default Business;