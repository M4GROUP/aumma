import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import * as bcryptjs from "bcryptjs";
import { AppError, handleError } from "../../errors/AppError";

const updateInstitutionService = async (id: string, updatedData: any) => {

    if (
        updatedData.cnpj === false ||
        updatedData.cnpj === true ||
        updatedData.email ||
        updatedData.isActive === true ||
        updatedData.isActive === false
    ) {
        throw new AppError(
            401,
            "Update is available only for name, password, address, ageGroup, phone"
        );
    }

    const testeRepository = AppDataSource.getRepository(Institution);
    const account = await testeRepository.findOneBy({ id });

    if (updatedData.password) {
        if (bcryptjs.compareSync(updatedData.password, account!.password)) {
            throw new AppError(401, "Inform a different password.");
        }
    }

    const newName = updatedData.name ? updatedData.name : account?.name;
    const newAddress = updatedData.address
        ? updatedData.address
        : account?.address;
    const newPassword = updatedData.password
        ? bcryptjs.hashSync(updatedData.password, 10)
        : account?.password;
    const newAgeGroup = updatedData.ageGroup
        ? updatedData.ageGroup
        : account?.ageGroup;
    const newPhone = updatedData.phone ? updatedData.phone : account?.phone;
    const newPCDAccept = updatedData.PCDAccept
        ? updatedData.PCDAccept
        : account?.PCDAccept;

    await testeRepository.update(account!.id, {
        name: newName,
        address: newAddress,
        password: newPassword,
        ageGroup: newAgeGroup,
        phone: newPhone,
        PCDAccept: newPCDAccept,
    });

    return true;
   
  
};

export default updateInstitutionService;
