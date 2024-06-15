import { UserDoc } from "../interfaces/IUser";
import { Request, Response } from 'express';
import UserRepositories from "../repositories/userRepositories";
import bcrypt from "bcrypt"
import { sendVerifyMail } from "../utils/otpVerification";
import OtpRepository from "../repositories/otpRepositories";
import { CreateJWT } from "../utils/generateToken";

class UserServices {
    private userRepo: UserRepositories;
    private otpRepo: OtpRepository;
    private createjwt: CreateJWT = new CreateJWT;


    constructor(userRepo: UserRepositories, otpRepo: OtpRepository) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;

    }

    async checkExistingEmail(email: string): Promise<boolean> {
        try {
            const userData: UserDoc | null = await this.userRepo.findUserByEmail(email);
            return !!userData;
        } catch (error) {
            console.error("Error in checkExistingEmail:", error);
            throw new Error("Failed to check existing email. Please try again later.");
        }
    }

    async createUser(
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
            const hashpass: string = await bcrypt.hash(password, 10)
            const otp: string = await sendVerifyMail(name, email)
            const newUser = await this.userRepo.createUser(name, email, phone, hashpass);
            return { status: true, newUser, otp, message: 'successful' };
        } catch (error) {
            console.error("Error in createUser:", error);
            return { status: false, message: "Failed to create user. Please try again later." };
        }
    }

    async veryfyOtp(userId: string) {
        const result = await this.otpRepo.verifyUser(userId)
        console.log("myyyyy", result)
        return { status: true, result, message: 'successful' };
    }
    async Login(email: string, password: string) {
        try {
            const result = await this.userRepo.login(email, password)
            console.log(result?.status == true);
            if (result?.status == true) {
                const token = this.createjwt.generateToken(result.user?.id);
                const refreshToken = this.createjwt.generateRefreshToken(result.user?.id)
                return {
                    data: {
                        data: {
                            succuss: true,
                            message: 'Authentication Successful !',
                            data: result.user,
                            userId: result.user?._id,
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

export default UserServices;
