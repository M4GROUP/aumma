import { instanceToInstance } from "class-transformer";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMother, IMotherRequest } from "../../interfaces/mothers";

const updateMotherService = async (id: string, motherRequest: IMotherRequest): Promise<IMother> => {
    
    const {address, cpf, email, name, password, phone, rg} = motherRequest;

    const motherRepository = AppDataSource.getRepository(Mother);
    
    const mother = await motherRepository.findOneBy({id});

    await motherRepository.update(
        id,{
            name: name ? name : mother!.name, address: address ? address : mother!.address,
            cpf: cpf ? cpf : mother!.cpf, email: email ? email : mother!.email,
            password: password ? await hash(password, 10) : mother!.password,
            phone: phone ? phone : mother!.phone, rg: rg ? rg : mother!.rg
        }
    );

    const updatedUser = instanceToInstance(await motherRepository.findOneBy({id}));

    console.log(updatedUser)

    return updatedUser!

}

export default updateMotherService;