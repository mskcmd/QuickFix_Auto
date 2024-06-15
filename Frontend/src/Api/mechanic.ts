import { RegData } from "../Components/Mechanic/MechanicCommen/RegisterOne";
import { FromData } from "../Pages/mechanic/SignupPage"
import mechanicRoute from "../Services/Endpoints/mechanicEndPointes";
import Api from "../Services/axios";


export const mechanicSingup = async ({ name, email, phone, password }: FromData) => {
    try {
        console.log(name, email, phone, password);
        const mechData = await Api.post(mechanicRoute.signup, { name, email, phone, password })
        return mechData

    } catch (error) {
        console.log(error);

    }


}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        console.log("yu", otp);

        const result = await Api.post(mechanicRoute.veryfyOtp, { otp })
        console.log("otp", result);
        if (result.data.succuss) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(mechanicRoute.Login, { email, password })
        console.log(result);
        return result
    } catch (error) {
        console.log(error);

    }
}
export const register = async ({role, name, location, services, employeeCount, companyCertificate, licenseNumber, images, companyDescription, experience}:RegData) => {
    try {
        const result = await Api.put(mechanicRoute.Register, { role, name ,location,services,employeeCount,companyCertificate,licenseNumber,images,companyDescription,experience})
        // console.log(result);
        return result
    } catch (error) {
        console.log(error);

    }
}