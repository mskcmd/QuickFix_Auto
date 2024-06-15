
import {FromData} from "../Pages/user/SignupPage"
import userRoutes from "../Services/Endpoints/userEndPoints";
import Api from "../Services/axios";

export const signup = async({name,email,phone,password}:FromData)=>{
try {
    console.log("haoi",name,email,phone,password);
    
    const result = await Api.post(userRoutes.signup,{name,email,phone,password})
    console.log("result", result);
    
    if(result.status==200){
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
        if(result.status){
        return result
         }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(email:string,password:string)=>{
    try {
        const result=  await Api.post(userRoutes.Login,{email,password})
        console.log("otp",result);
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