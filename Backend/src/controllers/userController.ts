import { Request, Response } from "express"
import UserServices from "../services/userServices";
import { UserDoc } from "../interfaces/IUser"
import { Cookie } from "express-session";
import { sendVerifyMail } from "../utils/otpVerification";
import { log } from "console";
class UserController {
  private userService: UserServices;

  milliseconds = (h: number, m: number, s: number) => ((h * 3600 + m * 60 + s) * 1000);

  constructor(userService: UserServices) {
    this.userService = userService;
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      console.log("All data", req.body);
      const { name, email, phone, password }: UserDoc = req.body;
      const result = await this.userService.createUser(name, email, phone, password);
      req.session.otp = result.otp;
      req.session.userId = result.newUser?._id as string;
      req.session.email = result.newUser?.email as string;
      req.session.name = result.newUser?.name as string;

      // Store the current time and OTP expiration time (1 minute later)
      const currentTime = Date.now();
      const otpExpirationTime = currentTime + 30 * 1000; // 1 minute in milliseconds
      req.session.otpTime = otpExpirationTime;

      if (result && result.status) {
        res.json({ isUser: true, success: true, result, message: result.message });
      } else {
        res.json({ notSuccess: false, message: result.message });
      }
    } catch (error) {
      console.error("Error in UserController.signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async veryfyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { otp } = req.body;
      const otpString = String(otp);
      const currentTime = Date.now();
      const otpExpirationTime = req.session.otpTime;

      // Check if OTP is expired
      if (!otpExpirationTime || currentTime > otpExpirationTime) {
        res.json({ message: "OTP has expired" });
        return
      }

      const userId: any = req.session.userId;
      if (otpString === req.session.otp) {
        const result = await this.userService.veryfyOtp(userId);
        console.log("userdata", result);
        if (result && result.status) {
          res.json({ isUser: true, success: true, result, message: result.message });
        } else {
          res.json({ notSuccess: false, message: result.message });
        }
      } else {
        res.json({ message: "OTP is wrong" });
      }
    } catch (error) {
      console.error("Error in UserController.verifyOtp:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async Login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
      console.log(email, password);
      const result = await this.userService.Login(email, password)
      if (result?.data.data?.succuss === true) {
        // console.log("yy", result)
        const time = this.milliseconds(23, 30, 0);
        const access_token = result.data.data.token;
        const refresh_token = result.data.data.refreshToken;
        const accessTokenMaxAge = 5 * 60 * 1000;
        const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
        res.status(200).cookie('access_token', access_token, {
          maxAge: accessTokenMaxAge,
          sameSite: 'none',
          secure: true
        }).cookie("refresh_token", refresh_token, {
          maxAge: refreshTokenMaxAge,
          sameSite: "none",
          secure: true
        }).json(result.data)
      } else {
        res.status(404).json({ success: false, message: 'Authentication error' });

      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' })

    }

  }
  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const email = req.session.email;
      const name = req.session.name;
      if (!email || !name) {
        res.status(400).json({ error: 'Email or name is missing' });
        return;
      }
      const otp: string = await sendVerifyMail(name, email);
      const currentTime = Date.now();
      const otpExpirationTime = currentTime + 30 * 1000;
      req.session.otpTime = otpExpirationTime;
      req.session.otp = otp;
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  }

  async forgetPassword(req: Request, res: Response): Promise<void> {
    try {
      const email = req.query.email as string;
      console.log(email);
      
      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }
      const result = await this.userService.forgetService(email);
      console.log(result);

      console.log("email check", result.result?.name);
      const name = result.result?.name;
      if (result.success && name) {
        const otp: string = await sendVerifyMail(name, email);
        const currentTime = Date.now();
        const otpExpirationTime = currentTime + 30 * 1000;
        req.session.otpTime = otpExpirationTime;
        req.session.otp = otp;
        res.json({ success: true, result });
      } else if (!name) {
        res.status(400).json({ error: 'User name is missing' });
      } else {
        res.status(500).json({ error: 'Failed to forget password' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const newPassword = req.body.password;
      const userId = req.body.userId;

      console.log('Received newPassword:', newPassword);
      console.log('Received userId:', userId);

      const result = await this.userService.resetPassword(newPassword, userId)
      res.json({result})
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async veryfyOtpreset(req: Request, res: Response): Promise<void> {
    try {

      const { otp, userId } = req.query;
      console.log("gf",req.query);

      if (typeof otp !== 'string' || typeof userId !== 'string') {
        res.status(400).json({ error: 'Invalid request parameters' });
        return;
      }

      const otpString = String(otp);
      const currentTime = Date.now();
      const otpExpirationTime = req.session.otpTime;

      // Check if OTP is expired
      if (!otpExpirationTime || currentTime > otpExpirationTime) {
        res.json({ message: "OTP has expired" });
        return;
      }

      if (otpString === req.session.otp) {
        console.log("good");
        const result = await this.userService.checkExistingUser(userId);
        res.json({ success: true, result })
      } else {
        res.json({ message: "OTP is wrong" });
      }
    } catch (error) {
      console.error("Error in UserController.verifyOtp:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


}

export default UserController