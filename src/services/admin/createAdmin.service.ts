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

    const admin = await adminRepository.find();
    const adminAlreadyExist = admin.find((admin) => admin.email === email);
    if (adminAlreadyExist) {
        throw new AppError(404, "Admin already exists");
    }

    if (name.length < 3) {
        throw new AppError(
            404,
            "Admin name must have more letters than 3"
        );
    }

    if (password.length > 10 || password.length < 2) {
        throw new AppError(
            404,
            "Password must have 3 digits or at least 10"
        );
    }


    const adminis = new Admin();
    adminis.name = name;
    adminis.email = email;
    adminis.password = bcryptjs.hashSync(password, 10);
    adminis.isAdm = isAdm;

    adminRepository.create(adminis);
    await adminRepository.save(adminis);

    const newAdmin = {
        id: adminis.id,
        name: name,
        email: adminis.email,
        isAdm: adminis.isAdm,
    };

    return newAdmin;
};

export default createAdminService;
