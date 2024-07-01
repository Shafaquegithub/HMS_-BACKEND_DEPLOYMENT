import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { messageModel } from "../models/messageSchema.js";

export const postMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const newMessage = await messageModel.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  res.status(200).json({
    success: true,
    message: "Message Sent Successfully!",
    newMessage,
  });
});
export const getAllmessages = catchAsyncError(async (req, res, next) => {
  const allMessages = await messageModel.find();
  if (!allMessages) {
    return next(new ErrorHandler("No message found", 400));
  }
  res.status(200).json({
    success: true,
    allMessages,
  });
});
