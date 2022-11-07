import { instanceToInstance } from "class-transformer";
import * as bcryptjs from "bcryptjs";
import AppDataSource from "../../data-source";
import { IAdmRequest } from "../../interfaces/admin";
import { Admin } from "../../entities/Admin.entity";

const updateAdminByIdService = async (id: string, admRequest: IAdmRequest) => {
  
    const { email, name, password, isActive} = admRequest;

    const adminRepository = AppDataSource.getRepository(Admin);

    const admin = await adminRepository.findOneBy({ id });

    await adminRepository.update(id, {
        name: name ? name : admin!.name,
        password: password ? await bcryptjs.hash(password, 10) : admin!.password,
    });

    const updatedUser = instanceToInstance(
        await adminRepository.findOneBy({ id })
    );

    return updatedUser!;
};

export default updateAdminByIdService;
