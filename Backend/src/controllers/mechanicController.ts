import { log } from "util";
import { MechnicDoc } from "../interfaces/IMechanic";
import MechanicServices from "../services/mechanicServices";
import { Request, Response } from "express"

class mechanicController {
    private mechanicServices: MechanicServices;
    milliseconds = (h: number, m: number, s: number) => ((h * 3600 + m * 60 + s) * 1000);

    constructor(mechanicServices: MechanicServices) {
        this.mechanicServices = mechanicServices
    }
    async MechanicSignup(req: Request, res: Response): Promise<void> {
        try {
            console.log("All mechanic  data", req.body);
            const { name, email, phone, password }: MechnicDoc = req.body
            const result = await this.mechanicServices.createMechanic(name, email, phone, password);
            req.session.mechotp = result?.otp
            req.session.mechanicId = result?.newMechanic?._id as string;
            console.log("ss", req.session.mechotp, req.session.mechanicId);
            if (result && result.status) res.json({ succuss: true, result, message: result.message })
            else res.json({ notsuccuss: false, message: result?.message });
        } catch (error) {
            console.log(error);

        }
    }

    async veryfyOtp(req: Request, res: Response): Promise<void> {
        const { otp } = req.body;
        const otpString = String(otp);
        console.log(typeof (req.session.mechotp))
        console.log(req.session.mechotp)
        const mechanicId: any = req.session.mechanicId
        if (otpString === req.session.mechotp) {
            console.log("otp is true");
            const result = await this.mechanicServices.veryfyOtp(mechanicId)
            console.log(result);

            if (result && result.status) res.json({ isMechanic: true, succuss: true, result, message: result.message })
            else res.json({ notsuccuss: false, message: result.message });
        } else {
            res.json({ message: "otp is rong" })
        }
    }
    async Login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            console.log("mechani",email, password);
            const result = await this.mechanicServices.Login(email, password)
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
  


}

export default mechanicController