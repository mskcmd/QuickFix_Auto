import { Request, Response } from "express"
import AdminServices from "../services/adminServics";



class AdminController{
    private adminServices: AdminServices;

    milliseconds = (h: number, m: number, s: number) => ((h * 3600 + m * 60 + s) * 1000);
  
    constructor(adminServices: AdminServices) {
      this.adminServices = adminServices;
    }


    async Login(req: Request, res: Response): Promise<void> {
        try {
          const { email, password } = req.body
          console.log("hff",email, password);
          const result = await this.adminServices.Login(email, password)
          console.log("yy", result)

          if (result?.data.data?.succuss === true) {
            const time = this.milliseconds(23, 30, 0);
            const access_token = result.data.data.token;
            const refresh_token = result.data.data.refreshToken;
            const accessTokenMaxAge = 5 * 60 * 1000;
            const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
            res.status(200).cookie('access_token', access_token, {
              maxAge: accessTokenMaxAge,
              sameSite: 'none',
              secure: true
            }).cookie("refresh_token", refresh_token, {
              maxAge: refreshTokenMaxAge,
              sameSite: "none",
              secure: true
            }).json(result.data)
          } else {
            res.status(404).json({ success: false, message: 'Authentication error' });
    
          }
        } catch (error) {
          res.status(500).json({ success: false, message: 'Internal server error' })
    
        }
    
      }

      async getUserhData(req: Request, res: Response): Promise<void> {
        try {
          const result = await this.adminServices.getUserData( )
          res.json(result)
      
        } catch (error) {
          console.error("Error fetching user data:", error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }

      async getMechData(req: Request, res: Response): Promise<void> {
        try {
          console.log("hjka");
          const result = await this.adminServices.getMechData( )
          res.json(result)
      
        } catch (error) {
          console.error("Error fetching user data:", error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

export default AdminController