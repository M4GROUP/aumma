import AppDataSource from "../../data-source";
import { IMother, IMotherRequest } from "../../interfaces/mothers";
import * as bcrypt from "bcryptjs";
import { instanceToInstance } from "class-transformer";
import { Mother } from "../../entities/Mother.entity";
import { createMotherSerializer } from "../../serializers/mothers/mother.serializer";

const createMotherService = async (
    motherRequest: IMotherRequest
): Promise<IMother> => {
    const serialized = await createMotherSerializer.validate(motherRequest, {
        abortEarly: true,
        stripUnknown: false,
    });

    const motherRepository = AppDataSource.getRepository(Mother);

    const hashedPassword = await bcrypt.hash(serialized.password, 10);

    const mother = motherRepository.create({
        address: serialized.address,
        cpf: serialized.cpf,
        name: serialized.name,
        email: serialized.email,
        password: hashedPassword,
        rg: serialized.rg,
        phone: serialized.phone,
    });

    mother.isActive = true;

    await motherRepository.save(mother);

    const newMother = instanceToInstance(mother);

    return newMother;
};

export default createMotherService;
