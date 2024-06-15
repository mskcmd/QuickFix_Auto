import { MechnicDoc } from "../interfaces/IMechanic";
import Mechanic from "../models/mechanicModel";
import bcrypt from 'bcrypt';

class mechanicRepositories {
    async findUserByEmail(email: string): Promise<MechnicDoc | null> {
        try {
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
   
}

export default mechanicRepositories