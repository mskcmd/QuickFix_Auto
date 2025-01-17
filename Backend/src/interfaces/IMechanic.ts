import { Document } from "mongoose"

export interface MechnicDoc extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  isMechanic?: boolean
  isCompleted?: boolean
  mechanicdataID?: string
  isBlocked?: boolean;
  isSubscriber?: boolean;
}

import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    mechotp: string;
    mechanicId: string;
    mechanicname: string;
    mechanicemail: string;
    mechanicotpTime: number;
  }
}


export interface IMechanicData extends Document {
  mechanicID?: string; // Optional mechanic ID
  type: string;
  licenseNumber: string;
  yearsOfExperience: number;
  specialization: string;
  latitude: string;
  longitude: string;
  district: string;
  locationName: string;
  services: string[];
  description: string;
  profileImages: { url: string; contentType: string }[];
  certificate: { url: string; contentType: string } | null;
  workingHours: {
    days: string[]; // Array of days, e.g., ['Monday', 'Tuesday']
    startTime: string; // Start time, e.g., '08:00'
    endTime: string; // End time, e.g., '17:00'
  }[];
}


export interface UploadedFile {
  [key: string]: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
  }[];
}