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
    const { address, cpf, email, name, password, phone, isActive, rg } =
        motherRequest;

const updateMotherService = async (id: string, motherRequest: IMotherRequest): Promise<IMother> => {
    
    const {address, cpf, email, name, password, phone,  rg} = motherRequest;

    // const serialized = await motherSerializer.validate(motherRequest, {
    //     abortEarly: true,
    //     stripUnknown: false
    // })

    const motherRepository = AppDataSource.getRepository(Mother);

    const mother = await motherRepository.findOneBy({ id });

    const updateSerialized = await updateMotherSerializer.validate(mother!, {
        abortEarly: true,
    })
    // console.log(serialized)
    // console.log(updateSerialized)

    // if(!mother!.isActive){throw new AppError(400, "User not active")};

    await motherRepository.update(
        id,{
            name: name ? name : updateSerialized!.name,
            address: address ? address : updateSerialized!.address,
            cpf: cpf ? cpf : updateSerialized!.cpf,
            email: email ? email : updateSerialized!.email,
            password: password ? await hash(password, 10) : updateSerialized!.password,
            phone: phone ? phone : updateSerialized!.phone,
            rg: rg ? rg : updateSerialized!.rg,
        }
    );

    const updatedUser = instanceToInstance(await motherRepository.findOneBy({id}));

    if(!updatedUser){throw new AppError(401, "Invalid id")};

    // const updateMotherSerialized = instanceToInstance(await motherSerializer.validate(updatedUser, {
    //     abortEarly: true,
    // }))

    if(updatedUser.isActive !== updateSerialized.isActive){throw new AppError(401, "Invalid update!")};

    return updatedUser;

}

    return updatedUser;
};

export default updateMotherService;
