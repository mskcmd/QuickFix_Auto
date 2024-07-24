import { AxiosResponse } from "axios";
import { MechanicFormData } from "../Pages/mechanic/RegisterOne";
import { FromData } from "../Pages/mechanic/SignupPage"
import mechanicRoute from "../Services/Endpoints/mechanicEndPointes";
import Api from "../Services/axios";
import { MechanicDataItem } from "../Components/Mechanic/MechanicCommen/MechanicLoggedin";


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
        console.log("dsf", result);
        return result
    } catch (error) {
        console.log(error);

    }
}
export const forgetPassword = async (email: string) => {
    try {
        console.log("email", email);
        const result = await Api.get(mechanicRoute.forgetPassword, { params: { email } });
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const verifyOtpReset = async (otpnum: string, userId: string) => {
    try {
        console.log("k", otpnum, userId);

        const otp = parseInt(otpnum);
        const result = await Api.get(mechanicRoute.veryfyOtpreset, { params: { otp, userId } });
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
        const result = await Api.post(mechanicRoute.resetPassword, { password, userId })
        console.log("", result);
        return result
    } catch (error) {
        console.log(error);
    }
};

export const mechanicRegister = async (mechanicData: MechanicFormData, mechanicId: string | undefined): Promise<AxiosResponse<unknown>> => {
    try {
        const formData = new FormData();
        // Append basic fields
        if (mechanicId) {
            formData.append('ID', mechanicId);
        }
        formData.append('type', mechanicData.type);
        formData.append('licenseNumber', mechanicData.licenseNumber);
        formData.append('yearsOfExperience', mechanicData.yearsOfExperience);
        formData.append('specialization', mechanicData.specialization);
        formData.append('location', mechanicData.location);
        formData.append('locationName', mechanicData.locationName);
        formData.append('description', mechanicData.description);
        // Append files
        if (mechanicData.certificate) {
            formData.append('certificate', mechanicData.certificate);
        }
        if (mechanicData.profileImages && mechanicData.profileImages.length > 0) {
            mechanicData.profileImages.forEach((file, index) => {
                formData.append(`profileImage${index}`, file); // Ensure field names match
            });
        }
        // Append services (if necessary, convert to JSON or a format expected by your API)
        formData.append('services', JSON.stringify(mechanicData.services));

        // Send the request
        const result = await Api.post(mechanicRoute.Register, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("4days",result);
        return result
        
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; // Optionally rethrow the error    
        }
};

export const getmechData = async (mechanicId: string): Promise<MechanicDataItem[]> => {
    try {
      const result = await Api.get<MechanicDataItem[]>(mechanicRoute.getData, { params: { Id: mechanicId } });
      return result.data;
    } catch (error) {
      console.error("Error fetching mechanic data:", error);
      throw error;
    }
  };

  export const  getDetailesData = async (mechanicId: string)=> {
    try {
      console.log("Fetching dasta for mechanic ID:", mechanicId);
      const result = await Api.get(mechanicRoute.getMcechData, { params: { Id: mechanicId } });
      return result.data;
    } catch (error) {
      console.error("Error fetching mechanic data:", error);
      throw error;
    }
  };

