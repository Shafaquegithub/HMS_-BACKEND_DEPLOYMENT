import express from "express";
import {
  addAdmin,
  addNewDoctor,
  addUser,
  adminLogout,
  getAllDoctors,
  // getUser,
  getUserDeatils,
  login,
  patientLogout,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();
//..
router.post("/adduser", addUser);
// router.get("/getuser", isPatientAuthenticated, getUser);
router.post("/addadmin", isAdminAuthenticated, addAdmin);
//...
router.post("/login", login);
router.get("/adminlogout", isAdminAuthenticated, adminLogout);
//...
router.get("/patientlogout", isPatientAuthenticated, patientLogout);
//...
router.get("/userdetails", isPatientAuthenticated, getUserDeatils);
router.get("/admindetails", isAdminAuthenticated, getUserDeatils);
router.post("/adddoctor", isAdminAuthenticated, addNewDoctor);
router.get("/getalldoctors", getAllDoctors);

export default router;
