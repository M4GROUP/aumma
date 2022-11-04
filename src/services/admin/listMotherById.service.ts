import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";


const listMotherByIdService= async (motherId: string) => {
    const mothersRepository = AppDataSource.getRepository(Mother);

    const myMother = await mothersRepository.find({
        where: { id: motherId },
        relations: {childrens:true},
    });
    return myMother;
};

export default listMotherByIdService;
