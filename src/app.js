import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
console.log("This is CORS_ORIGIN:", process.env.CORS_ORIGIN);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser())



app.use("/api/user", router);

export default app;