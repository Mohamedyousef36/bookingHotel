import express from "express"
import cors from "cors"
import dotenv, { parse } from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/authRoute.js"
import hotelsRouter from "./routes/hotelsRoute.js"
import roomsRouter from "./routes/roomsRoute.js"
import usersRouter from "./routes/userRoute.js"
import cookieParse from "cookie-parser"
import notFound from "./config/notFound.js";
import dbConnect from "./config/db.js"

dotenv.config();
const app = express();
app.use(cors())



const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  dbConnect();
  console.log(` server is running ${port}  `);
});

//middleware
app.use(cookieParse())

app.use(express.json())  // to accept json file

app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);
app.use('*',notFound)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something Went Wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    })
    
})




// Global rejection handling middleware

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection Errors", {
    message: err.message,
    stack: err.stack,
  });
  server.close(() => {
    console.log("server is shut down.....");
    process.exit(1);
  });
});
