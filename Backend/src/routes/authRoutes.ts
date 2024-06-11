import express,{Router} from "express";
import UserController from "../controllers/userController";
import UserServices from "../services/userServices";
import UserRepository from "../repositories/userRepositories";
import OtpRepository from "../repositories/otpRepositories";

const authRoute:Router = express.Router()

const otpRepositories = new OtpRepository()
const userRepository = new UserRepository()
const useServices = new UserServices(userRepository,otpRepositories)
const userController = new UserController(useServices)

authRoute.post("/signup",userController.signup.bind(userController))
authRoute.post("/veryfy-otp",userController.veryfyOtp.bind(userController))

export default authRoute