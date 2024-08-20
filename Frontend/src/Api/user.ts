
import { AxiosResponse } from "axios";
import { FromData } from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";
import { FormData } from "../Components/User/BookingForm";
import { BookingFormData } from "../Pages/user/MechBooking";

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
        console.log("hai sir");

        const result = await Api.post(userRoutes.Login, { email, password })
        console.log("eeee", result);
        return result
    } catch (error) {
        console.log(error);

    }
}

export const resendOtp = async () => {
    try {
        const result = await Api.get(userRoutes.resendOtp);
        console.log("resendOtp", result);
        return result
    } catch (error) {
        console.log(error as Error);
    }
}

export const forgetPassword = async (email: string) => {
    try {
        console.log("email", email);
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

        const result = await Api.post(userRoutes.resetPassword, { password, userId })
        console.log("", result);
        return result
    } catch (error) {
        console.log(error);
    }
};



export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k", otpnum, userId);

        const otp = parseInt(otpnum);
        const result = await Api.get(userRoutes.veryfyOtpreset, { params: { otp, userId } });
        console.log("otp", result);
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        return await Api.get(userRoutes.userLogout)
    } catch (error) {
        console.log(error);

    }
}

export const searchMechShop = async (formData: FormData): Promise<FormData | null> => {
    try {
        console.log("Form data is validf", formData);
        const response: AxiosResponse<FormData> = await Api.get(userRoutes.searchMech, {
            params: formData
        });
        console.log(response);

        return response.data;
    } catch (error) {
        console.error('Error searching for mechanic shops:', error);
        return null;
    }
};

export const booking = async (formData: BookingFormData) => {
    try {
        console.log("Submitting booking data:", formData);
        const result = await Api.post(userRoutes.booking, formData); // Removed the wrapping `formData` inside an object
        return result; // Ensure result is returned for further handling
    } catch (error) {
        console.error("Error during booking API call:", error);
        throw error; // Throw the error so it can be caught in handleSubmit
    }
};
