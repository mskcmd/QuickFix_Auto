// repositories/userRepositories.ts
import User from "../models/userModel";
import { UseLog, UserDoc } from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import Admin from "../models/adminModel";

class UserRepository {

  async findUserByEmail(email: string): Promise<UserDoc | null> {
    try {
      const userData: UserDoc | null = await User.findOne({ email }).exec();
      return userData;
    } catch (error) {
      console.error("Error in findUserByEmail:", error);
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

}

export default UserRepository;
