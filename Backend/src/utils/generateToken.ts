import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserDoc } from '../interfaces/IUser';


export const generateToken = (data: UserDoc ): string => {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret is not defined');
    const plainObject = data.toObject();
    return jwt.sign(plainObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION });
}