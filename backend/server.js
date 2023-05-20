import path from 'path'
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

connectDB();

const port = process.env.PORT || 5000;

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
}

app.get('/', (req, res) => res.send("Server is Running "))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Running on PORT http://localhost:${port}`);
})