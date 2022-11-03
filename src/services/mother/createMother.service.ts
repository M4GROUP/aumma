import AppDataSource from "../../data-source";
import { IMother, IMotherRequest } from "../../interfaces/mothers";
import * as bcrypt from "bcryptjs";
import { instanceToInstance } from "class-transformer";
import { Mother } from "../../entities/Mother.entity";

const createMotherService = async (motherRequest: IMotherRequest): Promise<IMother> => {

    const { address, cpf, email, name, password, rg, phone } = motherRequest;

    const motherRepository = AppDataSource.getRepository(Mother);

    const hashedPassword = await bcrypt.hash(password, 10);

    const mother = motherRepository.create({
        address, cpf, name, email, 
        password: hashedPassword, rg, phone
    });

    mother.isActive = true

    await motherRepository.save(mother);

    const newMother = instanceToInstance(mother);

    return newMother;

};

export default createMotherService;