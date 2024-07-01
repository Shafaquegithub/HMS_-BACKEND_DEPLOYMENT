import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { User } from "../models/userSchema.js";
import { responseWithJWT } from "../utils/jwToken.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const addUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full from", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("This email is already in Use", 400));
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });
  responseWithJWT(newUser, 200, "Registered Successfully!", res);
});
// export const getUser = async (req, res, next) => {
//   const users = await User.find();
//   res.status(200).json({
//     success: true,
//     users,
//   });

// };

export const addAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill full from", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("This email is already in Use", 400));
  }
  const newAdmin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin added Successfully!",
    newAdmin,
  });
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill full from", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and ConfirmPassword is not same", 400)
    );
  }
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Email  is wrong", 400));
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return next(new ErrorHandler(" Password is wrong", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("user with this role not found", 400));
  }
  user = user.toObject();
  delete user.password;

  responseWithJWT(user, 200, "Login Successfully", res);
});

export const adminLogout = catchAsyncError(async (eq, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Admin Logout Successfully",
    });
});
export const patientLogout = catchAsyncError(async (eq, res, next) => {
  res
    .status(200)
    .cookie("patientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Patient Logout Successfully",
    });
});
export const getUserDeatils = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please fill full from", 400));
  }
  if (!req.files) {
    return next(new ErrorHandler("Please upload image", 400));
  }
  const imageTypes = ["image/png", "image/jpeg", "image/webq", "image/jpg"];
  const { doctorAvatar } = req.files;
  if (!imageTypes.includes(doctorAvatar.mimetype)) {
    return next(new ErrorHandler("This image is not supported", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(
      new ErrorHandler(
        `${existingUser.role} with this email already registered`,
        400
      )
    );
  }
  const cloudinaryRespose = await cloudinary.uploader.upload(
    doctorAvatar.tempFilePath
  );
  if (!cloudinaryRespose) {
    return next(new ErrorHandler("cloudinary Error", 400));
  }
  let doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
    doctorAvatar: {
      public_id: cloudinaryRespose.public_id,
      url: cloudinaryRespose.secure_url,
    },
    role: "Doctor",
  });
  doctor = doctor.toObject();
  delete doctor.password;
  res.status(200).json({
    success: true,
    message: "New Doctor added Successfully!",
    doctor,
  });
});
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const allDoctors = await User.find({ role: "Doctor" });
  if (!allDoctors) {
    return next(new ErrorHandler("No doctor found", 400));
  }
  res.status(200).json({
    success: true,
    allDoctors,
  });
});
