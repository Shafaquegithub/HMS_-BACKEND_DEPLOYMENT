import express from "express";
import {
  appointmentController,
  deleteAppointment,
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";
const router = express.Router();
//...//
router.post("/postappointment", isPatientAuthenticated, appointmentController);
//..//
router.get("/allappointments", isAdminAuthenticated, getAllAppointments);
//...//
router.put("/updatestatus/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete(
  "/deleteappointment/:id",
  isAdminAuthenticated,
  deleteAppointment
);
export default router;
