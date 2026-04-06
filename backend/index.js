import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from './routes/dashboard.routes.js';
import recordRoutes from './routes/record.routes.js';

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Financial Management API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});