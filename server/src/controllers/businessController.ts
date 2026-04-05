import { Request, Response } from "express";
import User from "../models/User";
import Business from "../models/Business";

interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error", 
            error}
        );
    }
}


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

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let business = await Business.findOne({ email });

        if (business) {
            business.ownerName = ownerName;
            business.businessName = businessName;
            business.phone = phone;
            business.businessType = businessType;
            business.businessAddress = businessAddress;
            business.websiteOrSocial = websiteOrSocial || "";
            business.description = description || "";
            business.accountStatus = "pending";
            await business.save();
        } else {
            business = await Business.create({
                ownerName,
                businessName,
                email,
                phone,
                businessType,
                businessAddress,
                websiteOrSocial: websiteOrSocial || "",
                description: description || "",
                accountStatus: "pending",
            });
        }

        user.ownerName = ownerName;
        user.businessName = businessName;
        user.phone = phone;
        user.accountStatus = "pending";
        await user.save();

        return res.status(200).json({
            message: "Business verification submitted successfully",
            business,
        });
    } catch (error: any) {
        console.error("saveBusinessVerification error:", error);
        return res.status(500).json({
            message: "Server error",
            errorMessage: error?.message || "Unknown error",
        });
    }
};