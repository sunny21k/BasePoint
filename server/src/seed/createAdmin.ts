import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Connected to MongoDB");

        const adminEmail = "admin@basepoint.com";
        const adminPassword = "admin123";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Create admin user
        const admin = await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            accountStatus: "active",
            businessName: "BasePoint Admin",
        });

        console.log("✅ Admin created successfully!");
        console.log("Email:", adminEmail);
        console.log("Password:", adminPassword);
        console.log("ID:", admin._id);

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();