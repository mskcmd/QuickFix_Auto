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

export const resendOtp = async () => {
    try {
        await Api.get(mechanicRoute.resendOtp);
    } catch (error) {
        console.log(error as Error);
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(mechanicRoute.Login, { email, password })
        console.log("dsf",result);
        return result
    } catch (error) {
        console.log(error);

    }
}
export const forgetPassword = async (email: string) => {
    try {
        console.log("email",email);
        const result = await Api.get(mechanicRoute.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k",otpnum,userId);
        
        const otp = parseInt(otpnum);
        const result = await Api.get(mechanicRoute.veryfyOtpreset,{params: {otp,userId} } );
        console.log("otp", result);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword = async (password: string, userId: string) => {
    try {
        console.log("rgtre", password, userId);
        const result = await Api.post(mechanicRoute.resetPassword,{password,userId})
        console.log("",result);
        return result
    } catch (error) {
        console.log(error);
    }
};