// repositories/userRepositories.ts
import User from "../models/userModel";
import { UseLog, UserDoc } from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import Admin from "../models/adminModel";
import mongoose from 'mongoose';


class UserRepository {

  async findUserByEmail(email: string): Promise<UserDoc | null> {
    try {
      console.log("hh",email);
      
      const userData: UserDoc | null = await User.findOne({ email }).exec();
      console.log("ff",userData);
      
      return userData;
    } catch (error) {
      console.error("Error in findUserByEmail:", error);
      throw error;
    }
  }

  async findUserById(userId: string): Promise<UserDoc | null> {
    try {
        const userData: UserDoc | null = await User.findOne({ _id: userId }).exec();
        return userData;
    } catch (error) {
        console.error("Error in findUserById:", error);
        throw error;
    }
}


  async createUser(name: string, email: string, phone: string, password: string): Promise<UserDoc | undefined> {
    try {
      const newUser = new User({ name, email, phone, password });
      const result = await newUser.save();
      return result
    } catch (error) {
      console.log(error);

    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { status: false, message: "User not found." };

      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { status: false, message: "Invalid password." };
      }
      return { status: true, user };
    } catch (error) {
      console.error(error);
    }
  }
  async resetPassword(password: string,userId: string ) {
    try {
      
        if (!userId || !password) {
            throw new Error('User ID and password are required');
        }
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const userData: UserDoc | null = await User.findById(objectId).exec();

        if (!userData) {
            throw new Error('User not found');
        }
        const hashpass: string = await bcrypt.hash(password, 10);
        userData.password = hashpass; // Assuming userData has a password field
        const result = await userData.save();
        console.log('Password reset successful for user:', userId);
        return result
    } catch (error) {
        console.error('Error in UserService.resetPassword:', error);
        throw error;
    }
}


 
}

export default UserRepository;
