import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Institution } from "../../entities/Institution.entity";


const getMyInstitutionsService = async (institutionId:string) => {
    
    const institutionsRepository = AppDataSource.getRepository(Institution)
    
    const myInds = await institutionsRepository.find({
      where:{id:institutionId},
       relations: {childrensIn:true,schedules:true,mother:true}
       
    })
  return myInds
};

export default getMyInstitutionsService;
