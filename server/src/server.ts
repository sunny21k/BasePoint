import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});