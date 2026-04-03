import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes"
import businessRoutes from "./routes/businessRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes)

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});