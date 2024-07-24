import {Document} from "mongoose"

export interface MechnicDoc extends Document{
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  isMechanic?:boolean
  isCompleted?:boolean
  mechanicdataID?:string
  isBlocked?:boolean;
  isSubscriber?:boolean;
}

import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    mechotp: string;
    mechanicId: string;
    mechanicname:string;
    mechanicemail:string;
    mechanicotpTime:number;
  }
}


export interface IMechanicData extends Document {
  ID?: string;
  type: string;
  licenseNumber: string;
  yearsOfExperience: number; // Changed to number for consistency
  specialization: string;
  location: string;
  locationName: string;
  services: string[];
  description: string;
  profileImages: { url: string; contentType: string }[];
  certificate: { url: string; contentType: string } | null;
}



export interface UploadedFile {
  [key: string]: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
  }[];
}