import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 400));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(user.id);
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler("Admin not authenticated", 400));
  }
  next();
});
export const isPatientAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Patient not authenticated", 400));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(user.id);
  if (req.user.role !== "Patient") {
    return next(new ErrorHandler("Patient not authenticated", 400));
  }
  next();
});