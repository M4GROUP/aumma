import { instanceToInstance } from "class-transformer";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMotherRequest } from "../../interfaces/mothers";
import { AppError } from "../../errors/AppError";

const updateMotherByIdService = async (
    id: string,
    motherRequest: IMotherRequest
) => {
    const { address, cpf, email, name, password, phone, isActive, rg } =
        motherRequest;

    const motherRepository = AppDataSource.getRepository(Mother);

    const mother = await motherRepository.findOneBy({ id });

    if (!isActive) {
        console.log(isActive);
        throw new AppError(400, "User not active");
    }

    await motherRepository.update(id, {
        name: name ? name : mother!.name,
        address: address ? address : mother!.address,
        cpf: cpf ? cpf : mother!.cpf,
        email: email ? email : mother!.email,
        password: password ? await hash(password, 10) : mother!.password,
        phone: phone ? phone : mother!.phone,
        rg: rg ? rg : mother!.rg,
    });

    const updatedUser = instanceToInstance(
        await motherRepository.findOneBy({ id })
    );

    if (!updatedUser) {
        throw new AppError(401, "Invalid id");
    }

    return updatedUser;
};

export default updateMotherByIdService;
