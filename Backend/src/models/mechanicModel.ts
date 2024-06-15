// models/User.ts
import mongoose, { Schema, Model } from "mongoose";
import { MechnicDoc } from "../interfaces/IMechanic";

const mechanicSchema = new Schema<MechnicDoc>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false 
  },
  isMechanic: {
    type: Boolean,
    default: true
  }
});

const Mechanic: Model<MechnicDoc> = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
