import express from "express";
import {
  getAllmessages,
  postMessage,
} from "../controllers/messageController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";
const router = express.Router();
//....//
router.post("/addmessage", postMessage);
//...//
router.get("/getallmessage", isAdminAuthenticated, getAllmessages);
export default router;
