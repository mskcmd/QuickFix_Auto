import express,{Router} from "express";
import MechanicController from "../controllers/mechanicController";
import MechanicServices from "../services/mechanicServices";
import MechanicRepositories from "../repositories/mechanicRepositories";
import OtpRepository from "../repositories/otpRepositories";
import { uploadFields } from "../middleware/s3UploadMiddleware";

const mechanicRoute:Router = express.Router()

const otpRepositories = new OtpRepository()
const mechanicRepositories = new MechanicRepositories()
const mechanicServices = new MechanicServices(mechanicRepositories,otpRepositories)
const mechanicController = new MechanicController(mechanicServices)

mechanicRoute.post('/register', uploadFields, mechanicController.mech_register.bind(mechanicController));
mechanicRoute.get("/getData",mechanicController.getMechData.bind(mechanicController))
mechanicRoute.get("/getmechData",mechanicController.getDetailData.bind(mechanicController))



export default mechanicRoute