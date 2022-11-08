import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import { IAdmLogin } from "../../interfaces/admin";
import { Admin } from "../../entities/Admin.entity";

const loginAdminService = async (admin: IAdmLogin ) => {
    const adminRepository = AppDataSource.getRepository(Admin);
    
    const {email, password} = admin;

    const account = await adminRepository.findOneBy({email});

    const token = jwt.sign(
        {
            email: email,
            id: account!.id,
            isAdm: account!.isAdm
        },
        '' + process.env.SECRET_KEY,
        { 
            expiresIn: "24h", 
            subject: account!.id
        }
    );

    return {token: token, adminId: account?.id};
};

export default loginAdminService;
