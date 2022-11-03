import { instanceToInstance } from "class-transformer";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother, IMotherRequest } from "../../interfaces/mothers";
import { AppError } from "../../errors/AppError";
import { motherSerializer, updateMotherSerializer } from "../../serializers/mothers/mother.serializer";

const updateMotherService = async (
    id: string,
    motherRequest: IMotherRequest
): Promise<IMother> => {

    const serialized = await motherSerializer.validate(motherRequest, {
        abortEarly: true,
    })

    const motherRepository = AppDataSource.getRepository(Mother);

    const mother = await motherRepository.findOneBy({ id });

    const updateSerialized = await updateMotherSerializer.validate(mother!, {
        abortEarly: true,
    })

    await motherRepository.update(
        id,{
            name: serialized.name ? serialized.name : updateSerialized!.name,
            address: serialized.address ? serialized.address : updateSerialized!.address,
            password: serialized.password ? await hash(serialized.password, 10) : updateSerialized!.password,
            phone: serialized.phone ? serialized.phone : updateSerialized!.phone,
        }
    );

    const updatedUser = instanceToInstance(await motherRepository.findOneBy({id}));

    return updatedUser!;

};

export default updateMotherService;