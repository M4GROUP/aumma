import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";


const listAdminByIdService = async (adminId: string) => {
    const adminRepository = AppDataSource.getRepository(Admin);

    const myInds = await adminRepository.find({
        where: { id: adminId },
    });
    return myInds;
};

export default listAdminByIdService;
