import {Document} from "mongoose"

export interface UserDoc extends Document{
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  isUser?:boolean;
}
export interface UseLog {
  email:string;
  password:string
}
// types.ts
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    otp: string;
    userId: string;
    otpTime:number;
    email:string;
    name:string;
  }
}