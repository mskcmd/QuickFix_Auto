import {Document} from "mongoose"

export interface MechnicDoc extends Document{
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  isMechanic?:boolean
}

// types.ts
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    mechotp: string;
    mechanicId: string;
    // Add any other properties you need to store in the session
  }
}