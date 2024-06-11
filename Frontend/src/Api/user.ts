
import {FromData} from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";

export const signup = async({name,email,phone,password}:FromData)=>{
try {
    console.log("haoi",name,email,phone,password);
    
    const result = await Api.post(userRoutes.signup,{name,email,phone,password})
    console.log("result", result, false);
    
    if(result.data.succuss){
        return true
    }
} catch (error) {
console.log(error);
    
}
}

export const verifyOtp = async(otpnum:string)=>{
    try {
        const otp = parseInt(otpnum);
        const result = await Api.post(userRoutes.veryfyOtp,{otp})
        console.log("otp",result);
        if(result.data.succuss){
        return result
         }
    } catch (error) {
        console.log(error)
    }
}