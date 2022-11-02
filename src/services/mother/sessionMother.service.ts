import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Mother } from "../../entities/Mother.entity";
import { IMotherLogin } from "../../interfaces/mothers";
import jwt from "jsonwebtoken";

const sessionMotherService = async (mother: IMotherLogin) => {

    const motherRepository = AppDataSource.getRepository(Mother);

    const findMother = await motherRepository.findOneBy({email: mother.email});

    const token = jwt.sign(
        {
            email: mother.email,
        },
        '' + process.env.SECRET_KEY,
        {
            expiresIn: '24h',
            subject: findMother!.id
        }   
    );

    const motherData = instanceToInstance(findMother);
    
    return {token: token, mother: motherData};

}

export default sessionMotherService;