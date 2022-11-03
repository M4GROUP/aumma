import AppDataSource from "../../data-source";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { IAdmLogin } from "../../interfaces/admin";
import { Admin } from "../../entities/Admin.entity";

const loginAdminService = async ({ email, password }: IAdmLogin) => {
    const adminRepository = AppDataSource.getRepository(Admin);
    const admin = await adminRepository.find();

    const account = admin.find(
        (admin) => admin.email === email
    );

    if (!account) {
        throw new AppError(401, "Account not found");
    }

    if (!bcryptjs.compareSync(password, account.password)) {
        throw new AppError(401, "Wrong email/password");
    }

    const token = jwt.sign(
        {
            email: email,
            id: account.id,
            // AdminID: account.admin.id
        },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: account.id }
    );

    return token;
};

export default loginAdminService;
