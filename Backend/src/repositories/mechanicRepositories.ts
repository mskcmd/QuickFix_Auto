import mongoose from "mongoose";
import { MechnicDoc } from "../interfaces/IMechanic";
import Mechanic from "../models/mechanicModel";
import bcrypt from 'bcrypt';

class mechanicRepositories {
    async findUserByEmail(email: string): Promise<MechnicDoc | null> {
        try {
            console.log("ll");
            
            const userData: MechnicDoc | null = await Mechanic.findOne({ email }).exec();
            return userData;
        } catch (error) {
            console.error("Error in findUserByEmail:", error);
            throw error;
        }
    }

    async createMechanic(name: string, email: string, phone: string, password: string): Promise<MechnicDoc | undefined> {
        try {
            const newMechanic = new Mechanic({ name, email, phone, password });
            const mechanic = await newMechanic.save();
            return  mechanic ;

        } catch (error) {
            console.log(error);

        }
    }

    async login(email: string, password: string) {
        try {
            const mechanic = await Mechanic.findOne({ email });
            if (!mechanic) {
                return { status: false, message: "User not found." };
            }
            const isPasswordValid = await bcrypt.compare(password, mechanic.password);
            if (!isPasswordValid) {
                return { status: false, message: "Invalid password." };
            }
            return { status: true, mechanic };
        } catch (error) {
            console.error(error);
        }
    }
    async findUserById(userId: string): Promise<MechnicDoc | null> {
        try {
            const userData: MechnicDoc | null = await Mechanic.findOne({ _id: userId }).exec();
            return userData;
        } catch (error) {
            console.error("Error in findUserById:", error);
            throw error;
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
            const userData: MechnicDoc | null = await Mechanic.findById(objectId).exec();
    
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

export default mechanicRepositories