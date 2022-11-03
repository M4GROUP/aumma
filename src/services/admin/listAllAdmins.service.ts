import AppDataSource from "../../data-source";
import { Admin } from "../../entities/Admin.entity";


const listAllAdminsService = async () => {
    const adminsRepository = AppDataSource.getRepository(Admin);

    const myInds = await adminsRepository.find({});
    return myInds;
};

export default listAllAdminsService;
