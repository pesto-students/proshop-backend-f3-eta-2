import path from "path";
//const path = require('path')
import express from "express";
import dotenv from "dotenv";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
//import colors from 'colors'
import morgan from "morgan";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//Paypal Route
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//@Desc Fallback for unfamiliar routes
app.use(notFound);
// @Desc Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
