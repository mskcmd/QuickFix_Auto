import MechnicRepositories from "../repositories/mechanicRepositories";
import OtpRepository from "../repositories/otpRepositories";
import { MechnicDoc } from "../interfaces/IMechanic";
import { sendVerifyMail } from "../utils/otpVerification";
import bcrypt from "bcrypt";
import { CreateJWT } from "../utils/generateToken";

class mechanicServices {
    private mechanicRepo: MechnicRepositories;
    private otpRepo: OtpRepository;
    private createjwt: CreateJWT = new CreateJWT;


    constructor(mechanicRepo: MechnicRepositories, otpRepo: OtpRepository) {
        this.mechanicRepo = mechanicRepo;
        this.otpRepo = otpRepo;
    }

    async checkExistingEmail(email: string): Promise<boolean> {
        try {
            const userData: MechnicDoc | null =
                await this.mechanicRepo.findUserByEmail(email);
            return !!userData;
        } catch (error) {
            console.error("Error in checkExistingEmail:", error);
            throw new Error(
                "Failed to check existing email. Please try again later."
            );
        }
    }
    async createMechanic(
        name: string,
        email: string,
        phone: string,
        password: string
    ) {
        try {
            if (!name || !email || !phone || !password) {
                return { status: false, message: "Missing required fields" };
            }
            const emailExists = await this.checkExistingEmail(email);
            if (emailExists) {
                return { status: false, message: "Email already exists" };
            }
            const hashpass: string = await bcrypt.hash(password, 10);
            const otp: string = await sendVerifyMail(name, email);
            const newMechanic = await this.mechanicRepo.createMechanic(
                name,
                email,
                phone,
                hashpass
            );
            return { status: true, newMechanic, otp, message: "successful" };
        } catch (error) {
            console.log(error);
        }
    }
    async veryfyOtp(mechanicId: string) {
        const result = await this.otpRepo.verifyMechanic(mechanicId);
        console.log("myyxyyy", result);
        return { status: true, result, message: "successful" };
    }

    async Login(email: string, password: string) {
        try {
            const result = await this.mechanicRepo.login(email, password)
            console.log(result?.status == true);
            if (result?.status == true) {
                const token = this.createjwt.generateToken(result.mechanic?.id);
                const refreshToken = this.createjwt.generateRefreshToken(result.mechanic?.id)
                return {
                    data: {
                        data: {
                            succuss: true,
                            message: 'Authentication Successful !',
                            data: result.mechanic,
                            mechnicId: result.mechanic?._id,
                            token: token,
                            refreshToken: refreshToken
                        }
                    }
                }
            } else {
                return {
                    data: {
                        succuss: false,
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



}

export default mechanicServices;
