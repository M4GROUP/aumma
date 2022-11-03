import { instanceToInstance } from "class-transformer";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IAdmRequest } from "../../interfaces/admin";
import { Admin } from "../../entities/Admin.entity";

const updateAdminByIdService = async (
    id: string,
    admRequest: IAdmRequest
) => {
    const { email, name, password, isActive} =
    admRequest;

    const adminRepository = AppDataSource.getRepository(Admin);

    const admin = await adminRepository.findOneBy({ id });

    if (isActive === false) {
        console.log(isActive);
        throw new AppError(400, "User not active");
    }

    await adminRepository.update(id, {
        name: name ? name : admin!.name,
        email: email ? email : admin!.email,
        password: password ? await hash(password, 10) : admin!.password,
        
    });

    const updatedUser = instanceToInstance(
        await adminRepository.findOneBy({ id })
    );

    if (!updatedUser) {
        throw new AppError(401, "Invalid id");
    }

    return updatedUser;
};

export default updateAdminByIdService;
