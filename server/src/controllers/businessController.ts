import { Request, Response } from "express";
import User from "../models/User";
import Business from "../models/Business";
import Service from "../models/Service";
import Review from "../models/Review";

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findById(userId).select("-password").lean();
        const business = await Business.findOne({ userId }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user, business });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
};

export const saveBusinessVerification = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const {
            ownerName,
            email,
            phone,
            businessName,
            businessType,
            businessAddress,
            websiteOrSocial,
            description,
        } = req.body;

        if (!ownerName || !email || !phone || !businessName || !businessType || !businessAddress) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const makeSlug = (name: string) =>
            name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

        const slug = makeSlug(businessName);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let business = await Business.findOne({ userId });

        if (business) {
            business.ownerName = ownerName;
            business.businessName = businessName;
            business.slug = slug;
            business.email = email;
            business.phone = phone;
            business.businessType = businessType;
            business.businessAddress = businessAddress;
            business.websiteOrSocial = websiteOrSocial || "";
            business.description = description || "";
            await business.save();
        } else {
            business = await Business.create({
                userId,
                ownerName,
                businessName,
                slug,
                email,
                phone,
                businessType,
                businessAddress,
                websiteOrSocial: websiteOrSocial || "",
                description: description || "",
                isOnBoarded: false,
            });
        }

        user.businessName = businessName;
        user.accountStatus = "pending";
        user.verificationStatus = "submitted";
        await user.save();

        return res.status(200).json({
            message: "Business verification submitted successfully",
            business,
        });
    } catch (error: any) {
        console.error("saveBusinessVerification error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists.",
            });
        }

        return res.status(error.name === "ValidationError" ? 400 : 500).json({
            message: error.name === "ValidationError" ? "Validation failed" : "Server error",
            errorMessage: error?.message || "Unknown error",
            errors: error.errors,
        });
    }
};

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const {
            businessName,
            category,
            address,
            phone,
            description,
            preferences,
            hours,
            services,
        } = req.body;

        const business = await Business.findOne({ userId });

        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        business.businessName = businessName;
        business.businessType = category;
        business.businessAddress = address;
        business.phone = phone;
        business.description = description || "";
        business.preferences = preferences;
        business.hours = hours;
        business.isOnBoarded = true;

        await business.save();

        if (services && services.length > 0) {
            await Service.deleteMany({ businessId: business._id });

            const formattedServices = services.map((s: any) => ({
                businessId: business._id,
                name: s.name,
                price: s.price,
                duration: s.duration,
                description: s.description || "",
            }));

            await Service.insertMany(formattedServices);
        }

        return res.status(200).json({
            message: "Onboarding completed successfully",
            business,
        });
    } catch (error) {
        console.error("completeOnboarding error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

export const updateBusinessSettings = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Not authorized" });

        const { hours, preferences } = req.body;

        const business = await Business.findOne({ userId });
        if (!business) return res.status(404).json({ message: "Business not found" });

        if (hours) business.hours = hours;
        if (preferences) business.preferences = { ...business.preferences, ...preferences };

        await business.save();

        return res.status(200).json({ message: "Settings updated successfully", business });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update settings" });
    }
};

export const getPublicBusinesses = async (req: Request, res: Response) => {
    try {
        const businesses = await Business.find({
            isPublished: true,
            isOnBoarded: true,
        })
            .sort({ createdAt: -1 })
            .select(
                "businessName slug tagline category businessAddress serviceArea websiteOrSocial bookingLink instagram facebook tiktok description ratingAverage reviewCount attributes galleryImages hours holidayHours services isFeatured isVerified"
            );

        return res.status(200).json({ businesses });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch businesses",
        });
    }
};

export const getPublicBusinessBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const business = await Business.findOne({
            slug,
            isPublished: true,
            isOnBoarded: true,
        }).select(
            "businessName slug tagline category ownerName businessAddress serviceArea email phone websiteOrSocial bookingLink instagram facebook tiktok description ratingAverage reviewCount attributes galleryImages hours holidayHours services faq preferences isFeatured isVerified createdAt"
        );

        if (!business) {
            return res.status(404).json({
                message: "Business not found",
            });
        }

        const reviews = await Review.find({
            businessId: business._id,
            isPublished: true,
        })
            .sort({ createdAt: -1 })
            .limit(6)
            .select("rating comment reviewerName reviewerAvatar createdAt");

        return res.status(200).json({
            business,
            reviews,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch business",
        });
    }
};

export const getBusinessReviews = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const business = await Business.findOne({
            slug,
            isPublished: true,
            isOnBoarded: true,
        });

        if (!business) {
            return res.status(404).json({
                message: "Business not found",
            });
        }

        const reviews = await Review.find({
            businessId: business._id,
            isPublished: true,
        })
            .sort({ createdAt: -1 })
            .select("rating comment reviewerName reviewerAvatar createdAt");

        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch reviews",
        });
    }
};

export const createBusinessReview = async (req: AuthRequest, res: Response) => {
    try {
        const { slug } = req.params;
        const { rating, comment, reviewerName, reviewerAvatar } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({
                message: "Rating and comment are required",
            });
        }

        const business = await Business.findOne({
            slug,
            isPublished: true,
            isOnBoarded: true,
        });

        if (!business) {
            return res.status(404).json({
                message: "Business not found",
            });
        }

        const review = await Review.create({
            businessId: business._id,
            userId: req.user?.id,
            rating,
            comment,
            reviewerName,
            reviewerAvatar,
            isPublished: true,
        });

        const reviews = await Review.find({
            businessId: business._id,
            isPublished: true,
        });

        const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);
        const reviewCount = reviews.length;
        const ratingAverage = reviewCount ? totalRating / reviewCount : 0;

        business.ratingAverage = Number(ratingAverage.toFixed(1));
        business.reviewCount = reviewCount;
        await business.save();

        return res.status(201).json({
            message: "Review added successfully",
            review,
            business: {
                ratingAverage: business.ratingAverage,
                reviewCount: business.reviewCount,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create review",
        });
    }
};

export const updateBusinessProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const business = await Business.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const {
            businessName,
            tagline,
            category,
            ownerName,
            email,
            phone,
            businessAddress,
            serviceArea,
            websiteOrSocial,
            bookingLink,
            instagram,
            facebook,
            tiktok,
            description,
            holidayHours,
            attributes,
            preferences,
            hours,
            services,
            faq,
            galleryImages,
        } = req.body;

        if (businessName !== undefined) business.businessName = businessName;
        if (tagline !== undefined) business.tagline = tagline;
        if (category !== undefined) business.category = category;
        if (ownerName !== undefined) business.ownerName = ownerName;
        if (email !== undefined) business.email = email;
        if (phone !== undefined) business.phone = phone;
        if (businessAddress !== undefined) business.businessAddress = businessAddress;
        if (serviceArea !== undefined) business.serviceArea = serviceArea;
        if (websiteOrSocial !== undefined) business.websiteOrSocial = websiteOrSocial;
        if (bookingLink !== undefined) business.bookingLink = bookingLink;
        if (instagram !== undefined) business.instagram = instagram;
        if (facebook !== undefined) business.facebook = facebook;
        if (tiktok !== undefined) business.tiktok = tiktok;
        if (description !== undefined) business.description = description;
        if (holidayHours !== undefined) business.holidayHours = holidayHours;

        if (Array.isArray(attributes)) {
            business.attributes = attributes;
        }

        if (preferences) {
            business.preferences = {
                ...(business.preferences || {}),
                ...preferences,
            };
        }

        if (hours) {
            business.hours = {
                ...(business.hours || {}),
                ...hours,
            };
        }

        if (Array.isArray(services)) {
            business.services = services;
        }

        if (Array.isArray(faq)) {
            business.faq = faq;
        }

        if (Array.isArray(galleryImages)) {
            business.galleryImages = galleryImages;
        }

        if (hours) business.markModified("hours");
        if (preferences) business.markModified("preferences");

        await business.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            business,
        });
    } catch (error: any) {
        console.error("updateBusinessProfile error:", error);
        return res.status(500).json({
            message: "Failed to update profile",
            error: error?.message || "Unknown error",
            name: error?.name,
        });
    }
};