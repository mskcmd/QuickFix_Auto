import express,{Router} from "express";
import MechanicController from "../controllers/mechanicController";
import MechanicServices from "../services/mechanicServices";
import MechanicRepositories from "../repositories/mechanicRepositories";
import OtpRepository from "../repositories/otpRepositories";

const mechanicRoute:Router = express.Router()

const otpRepositories = new OtpRepository()
const mechanicRepositories = new MechanicRepositories()
const mechanicServices = new MechanicServices(mechanicRepositories,otpRepositories)
const mechanicController = new MechanicController(mechanicServices)

// mechanicRoute.post("/register",mechanicController.register.bind(mechanicController))



export default mechanicRoute