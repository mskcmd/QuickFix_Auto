import mongoose, { Model, Schema, Types } from "mongoose";
import { IMechanicData } from "../interfaces/IMechanic";
import Mechanic from "./mechanicModel"; // Assuming this is the correct import

// Define the schema
const MechanicDataSchema: Schema = new Schema({
  mechanicID: { 
    type: Schema.Types.ObjectId,
    required: true,
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
  district: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
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
  }],
  certificate: {
    url: { type: String },
    contentType: { type: String },
  },
}, { timestamps: true });

MechanicDataSchema.index({ location: '2dsphere' });

const MechanicData: Model<IMechanicData> = mongoose.model<IMechanicData>("MechanicData", MechanicDataSchema);

export default MechanicData;