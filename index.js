import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import participantRoutes from "./routes/participant.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",        // local frontend
    "https://sabuj-sangha.vercel.app" // production frontend
  ],
  methods: ["GET", "POST"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/participants", participantRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// ✅ Only listen locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ✅ Export for Vercel
export default app;

