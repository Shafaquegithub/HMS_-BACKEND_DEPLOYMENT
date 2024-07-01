import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, "First name must contain atleast 3 letters"],
    required: true,
  },
  lastName: {
    type: String,
    minLength: [3, "Last name must contain atleast 3 letters"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Enter Valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number must contain only 11 Digits"],
    maxLength: [11, "Phone number must contain only 11 Digits"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC must contain only 13 Digits"],
    maxLength: [13, "NIC must contain only 13 Digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: [true, "DOB is required"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain only 8 Digits"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Patient", "Doctor"],
    required: true,
  },
  doctorDepartment: {
    type: String,
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// userSchema.methods.checkPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

export const User = mongoose.model("users", userSchema);
