import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 letters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain atleast 3 letters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Email is not valid"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain 10 numbers"],
    maxLength: [10, "Phone number must contain 10 numbers"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain atleast 10 letters"],
  },
});

export const messageModel = mongoose.model("messages", messageSchema);
