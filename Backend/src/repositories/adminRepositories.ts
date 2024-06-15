import bcrypt from 'bcrypt';
import Admin from "../models/adminModel";


class adminRepositories {
    async login(email: string, password: string) {
        try {
          const admin = await Admin.findOne({ email });
          if (!admin) {
            return { status: false, message: "User not found." };
    
          }
          const isPasswordValid = await bcrypt.compare(password, admin.password);
          if (!isPasswordValid) {
            return { status: false, message: "Invalid password." };
          }
          return { status: true, admin };
        } catch (error) {
          console.error(error);
        }
      }
}

export default adminRepositories