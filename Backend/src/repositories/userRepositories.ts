// repositories/userRepositories.ts
import User from "../models/userModel";
import { UserDoc } from "../interfaces/IUser";

class UserRepository {

  async findUserByEmail(email: string): Promise<UserDoc | null> {
    try {
        const userData:UserDoc | null = await User.findOne({ email }).exec();
        return userData;
    } catch (error) {
        console.error("Error in findUserByEmail:", error);
        throw error;
    }
}

  async createUser(name: string, email: string, phone: string, password: string): Promise<UserDoc|undefined> {
   try {
    const newUser = new User({ name, email, phone, password });
    return await newUser.save();
    
   } catch (error) {
    console.log(error);
    
   }
  }
}

export default UserRepository;
