import AppDataSource from "../../data-source";
import * as bcryptjs from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { Admin } from "../../entities/Admin.entity";
import { IAdmRequest } from "../../interfaces/admin";

const createAdminService = async ({
    name,
    email,
    password,
    isAdm,
}: IAdmRequest) => {
    const adminRepository = AppDataSource.getRepository(Admin);

    const admins = new Admin();
    admins.name = name;
    admins.email = email;
    admins.password = await bcryptjs.hash(password, 10);
    admins.isAdm = isAdm;

    adminRepository.create(admins);
    await adminRepository.save(admins);

    const newAdmin = {
        id: admins.id,
        name: name,
        email: admins.email,
        isAdm: admins.isAdm,
    };
console.log(password)
    return newAdmin;
};

export default createAdminService;
