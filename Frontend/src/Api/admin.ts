import Api from "../Services/axios";
import adminRoute from "../Services/Endpoints/adminEndPoints";

export const Login = async(email:string,password:string)=>{
    try {
        const result=  await Api.post(adminRoute.Login,{email,password})
        console.log("hai",result);
       return result
    } catch (error) {
       console.log(error);
        
    }
}