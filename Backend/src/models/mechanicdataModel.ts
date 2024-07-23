import mongoose, { Document, Model, Schema } from "mongoose";
import { IMechanicData } from "../interfaces/IMechanic"; // Correct import

const MechanicDataSchema: Schema = new Schema({
  mechanicID: { 
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  services: [{
    type: String,
  }],
  description: {
    type: String,
    required: true,
  },
  profileImages: [{
    url: { type: String },
    contentType: { type: String },
  }], // Changed to store objects
  certificate: {
    url: { type: String },
    contentType: { type: String },
  }, // Changed to store objects
}, { timestamps: true });

const MechanicData: Model<IMechanicData> = mongoose.model<IMechanicData>("MechanicData", MechanicDataSchema);

export default MechanicData;
