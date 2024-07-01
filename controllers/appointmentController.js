import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { appointmentModel } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const appointmentController = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    doctor,
    appointment_date,
    hasVisited,
    doctorDepartment,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !doctor ||
    !appointment_date ||
    !doctorDepartment ||
    !address
  ) {
    return next(new ErrorHandler("please full form", 400));
  }
  if (!req.user.role === "Patient") {
    return next(new ErrorHandler("Only Patient can take Appointment", 400));
  }
  const findDoctor = await User.find({
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    role: "Doctor",
    doctorDepartment: doctorDepartment,
  });
  if (findDoctor.length === 0) {
    return next(new ErrorHandler("no doctor found", 400));
  }
  if (findDoctor.length > 1) {
    return next(new ErrorHandler("Please take offline appointment", 400));
  }
  const newAppointment = await appointmentModel.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    doctor: {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
    },
    appointment_date,
    hasVisited,
    doctorDepartment,
    address,
    patientId: req.user.id,
    doctorId: findDoctor[0]._id,
  });
  res.status(200).json({
    success: true,
    findDoctor,
    message: "Appointment taken Successfully",
  });
});
export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const allAppointments = await appointmentModel.find();
  if (!allAppointments) {
    return next(new ErrorHandler("No appointments", 400));
  }
  res.status(200).json({
    success: true,
    allAppointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("No appointment found", 400));
    }
    const updateStatus = await appointmentModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "status updated successfully!",
      updateStatus,
    });
  }
);
export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await appointmentModel.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("No appointment found", 400));
  }
  const deletedApp = await appointmentModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "appointment deleted successfully!",
  });
});
