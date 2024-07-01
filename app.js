import express from "express";
import { dbConnection } from "./databse/dbConnection.js";
import userRouter from "./routers/userRouters.js";
import { errorMiddleware } from "./middleware/errorHandler.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import messageRouter from "./routers/messageRouter.js";
import appointmentRouter from "./routers/appointmentRouiter.js";
import cors from "cors";

const app = express();
config({ path: "config/config.env" });
app.use(
  cors({
    origin: [
      "https://hospital-management-system-si.netlify.app/",
      process.env.LOCALHOST_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// app.use(express.urlencoded({ extended: true }));

app.use("/app/v1/user", userRouter);
app.use("/app/v1/message", messageRouter);
app.use("/app/v1/appointment", appointmentRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
