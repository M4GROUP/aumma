import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";


const listMotherByIdService= async (id: string): Promise<Mother> => {
    const mothersRepository = AppDataSource.getRepository(Mother);

    const myMother = instanceToInstance(
        await mothersRepository.findOneBy({id})
    );

    return myMother!;
};

export default listMotherByIdService;
