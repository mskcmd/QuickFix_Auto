import { Request, Response } from "express"
import UserServices from "../services/userServices";
import { UserDoc } from "../interfaces/IUser"
class UserController {
  private userService: UserServices;

  constructor(userService: UserServices) {
    this.userService = userService;
  }
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password }: UserDoc = req.body
      const result = await this.userService.createUser(name, email, phone, password);
      req.session.otp = result.otp
      req.session.userId = result.newUser?._id as string;
      console.log("ss", req.session.otp, req.session.userId);
      if (result && result.status) res.json({ succuss: true, result, message: result.message })
      else res.json({ notsuccuss: false, message: result.message });
    } catch (error) {
      console.error("Error in UserController.signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async veryfyOtp(req: Request, res: Response): Promise<void> {
    const { otp } = req.body;
    const otpString = String(otp);
    console.log(typeof (req.session.otp))
    console.log(req.session.otp)
    const userId: any = req.session.userId
    if (otpString === req.session.otp) {
      console.log("dddd")
      const result = await this.userService.veryfyOtp(userId)
      if (result && result.status) res.json({ succuss: true, result, message: result.message })
      else res.json({ notsuccuss: false, message: result.message });
    } else {
      console.log("ffff");

    }


  }
}

export default UserController