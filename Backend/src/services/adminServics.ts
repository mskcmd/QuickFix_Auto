import AdminRepositories from "../repositories/adminRepositories";
import { CreateJWT } from "../utils/generateToken";





class AdminServices {
    private adimnRepo: AdminRepositories;
    private createjwt: CreateJWT = new CreateJWT;


    constructor(adimnRepo: AdminRepositories) {
        this.adimnRepo = adimnRepo;

    }

    async Login(email: string, password: string) {
        try {
            const result = await this.adimnRepo.login(email, password)
            console.log(result?.status == true);
            if (result?.status == true) {
                const token = this.createjwt.generateToken(result.admin?.id);
                const refreshToken = this.createjwt.generateRefreshToken(result.admin?.id)
                return {
                    data: {
                        data: {
                            succuss: true,
                            message: 'Authentication Successful !',
                            data: result.admin,
                            adminId: result.admin?._id,
                            token: token,
                            refreshToken: refreshToken
                        }
                    }
                }
            } else {
                return {
                    data: {
                        succuss: false,
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default AdminServices