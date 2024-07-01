import {Document} from "mongoose"

export interface MechnicDoc extends Document{
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  isMechanic?:boolean
  isCompleted?:boolean
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