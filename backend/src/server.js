import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
// import serverless from "serverless-http";
// import rateLimiter from "./middleware/rateLimit.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://mern-thinkboard-frontend-opal.vercel.app"
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // include OPTIONS
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json()); //this middleware will parse JSON bodies: req.body
// app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
