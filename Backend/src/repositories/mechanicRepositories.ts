import mongoose from "mongoose";
import { IMechanicData, MechnicDoc } from "../interfaces/IMechanic";
import Mechanic from "../models/mechanicModel";
import MechanicData from "../models/mechanicdataModel";
import { Types } from 'mongoose';

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
            return mechanic;

        } catch (error) {
            console.log(error);

        }
    }



    async login(email: string, password: string) {
        try {
            const mechanic = await Mechanic.findOne({ email }).select('-password');
            console.log("user", mechanic);

            if (!mechanic) {
                return { status: false, message: "mechanic not found." };
            }
            if (!mechanic.isVerified) {
                return { isVerified: false, message: "mechanic not verified." };
            }

            const mechanicWithPassword = await Mechanic.findOne({ email }).select('+password');
            if (!mechanicWithPassword) {
                return { status: false, message: "mechanic not found for password validation." };
            }

            const isPasswordValid = await bcrypt.compare(password, mechanicWithPassword.password);
            if (!isPasswordValid) {
                return { status: false, message: "Invalid password." };
            }

            return { status: true, mechanic };
        } catch (error) {
            console.error(error);
            return { status: false, message: "An error occurred during login." };
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

    async resetPassword(password: string, userId: string) {
        try {

            if (!userId || !password) {
                throw new Error('User ID and password are required');
            }
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('Invalid user ID');
            }
            const objectId = new mongoose.Types.ObjectId(userId);
            const userData: MechnicDoc | null = await Mechanic.findById(objectId).exec();

            if (!userData) {
                throw new Error('User not found');
            }
            const hashpass: string = await bcrypt.hash(password, 10);
            userData.password = hashpass;
            const result = await userData.save();
            console.log('Password reset successful for user:', userId);
            return result
        } catch (error) {
            console.error('Error in UserService.resetPassword:', error);
            throw error;
        }
    }

    async registerData(uploadUrls: Record<string, string>, body: any): Promise<IMechanicData> {
        try {
            console.log("Processing data...");

            const formatImage = (url: string): { url: string; contentType: string } => ({
                url,
                contentType: 'image/jpeg',
            });

            const profileImages = [
                uploadUrls.profileImage0,
                uploadUrls.profileImage1,
                uploadUrls.profileImage2,
                uploadUrls.profileImage3,
            ]
                .filter(Boolean)
                .map(formatImage);
            console.log("ght", body.mechanicID);
            const mechanicID = Types.ObjectId.createFromHexString(body.ID)
            const mechanicData = new MechanicData({
                mechanicID: mechanicID,
                type: body.type,
                licenseNumber: body.licenseNumber,
                yearsOfExperience: body.yearsOfExperience,
                specialization: body.specialization,
                location: body.location,
                locationName: body.locationName,
                services: body.services,
                description: body.description,
                profileImages: profileImages, // Array of objects
                certificate: uploadUrls.certificate
                    ? formatImage(uploadUrls.certificate)
                    : null,
            });

            const result = await mechanicData.save();
            console.log("nfd", result._id);
            if (result) {
                await Mechanic.findOneAndUpdate(
                    { _id: mechanicID },
                    {
                        isCompleted: true,
                        mechanicdataID: result._id,
                    },
                    { new: true }
                );

            }


            return mechanicData;
        } catch (error) {
            console.error('Error in registerData:', error);
            throw new Error('Failed to register mechanic data');
        }
    }

    async getmechData(id: string): Promise<any> {
        try {
            const objectId = new mongoose.Types.ObjectId(id);

            const result = await Mechanic.aggregate([
                { $match: { _id: objectId } },
                {
                    $lookup: {
                        from: "mechanicdatas",
                        localField: "mechanicdataID",
                        foreignField: "_id",
                        as: "mechanicData"
                    }
                },
                { $unwind: "$mechanicData" },
                {
                    $project: {
                        password: 0,
                        "mechanicData.password": 0
                    }
                }
            ]);

            if (result.length === 0) {
                console.log("Mechanic not found or no associated mechanic data");
                return null;
            }

            console.log("Fetched mechanic data for ID:", id);
            return result[0];
        } catch (error) {
            console.error("Error in repository layer:", error);
            throw new Error('Database query failed');
        }
    }

}

export default mechanicRepositories