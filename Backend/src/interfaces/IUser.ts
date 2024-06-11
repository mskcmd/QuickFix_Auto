import {Document} from "mongoose"

export interface UserDoc extends Document{
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
}
// types.ts
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    otp: string;
    userId: string;
    // Add any other properties you need to store in the session
  }
}