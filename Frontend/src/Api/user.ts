
import { FromData } from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";

export const signup = async ({ name, email, phone, password }: FromData) => {
    try {
        console.log("haoi", name, email, phone, password);

        const result = await Api.post(userRoutes.signup, { name, email, phone, password })
        console.log("result", result);

        if (result.status == 200) {
            return result
        }
    } catch (error) {
        console.log(error);

    }
}

export const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.post(userRoutes.veryfyOtp, { otp })
        console.log("otp", result);
        if (result.status) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const result = await Api.post(userRoutes.Login, { email, password })
        console.log("otp", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const resendOtp = async () => {
    try {
        await Api.get(userRoutes.resendOtp);
    } catch (error) {
        console.log(error as Error);
    }
}

export const forgetPassword = async (email: string) => {
    try {
        console.log("email",email);
        const result = await Api.get(userRoutes.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
};
export const resetPassword = async (password: string, userId: string) => {
    try {
        console.log("rgtre", password, userId);
        
        const result = await Api.post(userRoutes.resetPassword,{password,userId})
        console.log("",result);
        return result
    } catch (error) {
        console.log(error);
    }
};



export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k",otpnum,userId);
        
        const otp = parseInt(otpnum);
        const result = await Api.get(userRoutes.veryfyOtpreset,{params: {otp,userId} } );
        console.log("otp", result);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}
