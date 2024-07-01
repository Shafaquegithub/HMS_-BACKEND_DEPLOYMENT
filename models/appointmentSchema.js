import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "firstName required atleast 3 letter"],
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
  appointment_date: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    required: true,
  },
  doctorDepartment: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    enum: ["Pending", "Accepted", "Rejected"],
    required: true,
    type: String,
    default: "Pending",
  },
});

export const appointmentModel = mongoose.model(
  "appointments",
  appointmentSchema
);
