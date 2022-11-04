import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";


const deleteAdminByIdService = async (id: string): Promise<object> => {
    const adminRepository = AppDataSource.getRepository(Admin);

    const admin = await adminRepository.findOneBy({id});

    admin!.isActive = false;

    await adminRepository.save(admin!);

    return {isActive:  admin!.isActive};

};

export default deleteAdminByIdService;