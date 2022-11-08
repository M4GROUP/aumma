import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";


const listAdminByIdService = async (id: string) => {
    const adminRepository = AppDataSource.getRepository(Admin);

    const admin = await adminRepository.findOneBy({id});
    
    return admin!;
};

export default listAdminByIdService;
