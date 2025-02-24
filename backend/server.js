import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import vendorRouter from "./routes/vendorRoute.js";
import userRouter from "./routes/userRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
connectDb(); //from mongoose.js
connectCloudinary();
app.use("/uploads", express.static("uploads"));

// api end points

// Routes
app.use("/api", vendorRouter);

// user route
app.use("/api", userRouter);

app.get(`/`, (req, res) => {
  res.send("api working awesome");
});

app.listen(port, () => console.log("server started", port));
