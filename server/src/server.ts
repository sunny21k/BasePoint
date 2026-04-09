import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import businessRoutes from "./routes/businessRoutes";
import adminRoutes from "./routes/adminRoutes"; 
import serviceRoutes from "./routes/serviceRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/admin", adminRoutes);  
app.use("/api/services", serviceRoutes);

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});