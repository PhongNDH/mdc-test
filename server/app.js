import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import { router as authRoutes } from "./routes/auth.js";

dotenv.config();

const limiter = rateLimit({
   windowMs: 60, // 1 minute
   max: 5, // limit each IP to 100 requests per windowMs
   message: "Too many requests from this IP, please try again later",
});

const app = express();
app.use(limiter);

app.use(bodyParser.json());
app.use(
   cors({
      credentials: true,
   })
);

app.use(authRoutes);

app.listen(process.env.PORT, () => {
   console.log("App is running on port " + process.env.PORT);
});
