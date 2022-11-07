import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";


const listAllAdminsService = async (): Promise<Admin[]> => {
    const adminsRepository = AppDataSource.getRepository(Admin);

    const admins = await adminsRepository.find();

    return admins;
};

export default listAllAdminsService;
