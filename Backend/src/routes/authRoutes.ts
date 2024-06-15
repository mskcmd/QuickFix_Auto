import express,{Router} from "express";
import UserController from "../controllers/userController";
import UserServices from "../services/userServices";
import UserRepository from "../repositories/userRepositories";
import OtpRepository from "../repositories/otpRepositories";
import MechanicController from "../controllers/mechanicController";
import MechanicServices from "../services/mechanicServices";
import MechanicRepositories from "../repositories/mechanicRepositories";
import AdminRepositories from "../repositories/adminRepositories";
import AdminServices from "../services/adminServics";
import AdminController from "../controllers/adminController";

const authRoute:Router = express.Router()

const otpRepositories = new OtpRepository()
const userRepository = new UserRepository()
const useServices = new UserServices(userRepository,otpRepositories)
const userController = new UserController(useServices)


const mechanicRepositories = new MechanicRepositories()
const mechanicServices = new MechanicServices(mechanicRepositories,otpRepositories)
const mechanicController = new MechanicController(mechanicServices)

const adminRepositories = new AdminRepositories()
const adminServices = new AdminServices(adminRepositories)
const adminController = new AdminController(adminServices)


authRoute.post("/signup",userController.signup.bind(userController))
authRoute.post("/veryfy-otp",userController.veryfyOtp.bind(userController))
authRoute.post("/login",userController.Login.bind(userController))
authRoute.get("/resendotp",userController.resendOtp.bind(userController))

authRoute.post("/mechanic/signup",mechanicController.MechanicSignup.bind(mechanicController))
authRoute.post("/mechanic/veryfy-otp",mechanicController.veryfyOtp.bind(mechanicController))
authRoute.post("/mechanic/login",mechanicController.Login.bind(mechanicController))



authRoute.post("/admin/login",adminController.Login.bind(adminController))



export default authRoute