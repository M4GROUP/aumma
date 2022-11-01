import { IInstitutionRequest } from "../../interfaces/institutions";
import AppDataSource from "../../data-source";
import * as bcryptjs from "bcryptjs";
import { AppError } from "../../errors/AppError";
 import Institution from "../../entities/institution.entities.ts";


const createInstitutionService = async ({
  name,
  address,
  cnpj,
  age_group,
  telephone,
  email,
  password,
  acc_children_disability,
}: IInstitutionRequest) => {
  const institutionRepository = AppDataSource.getRepository(Institution);

  const institutions = await institutionRepository.find();

  const institutionAlreadyExists = institutions.find(
    (institution) => institution.name === name
  );

  if (institutionAlreadyExists) {
    throw new AppError(409, "Institution already exists");
  }

  const institution = new Institution();
  institution.name = name;
  institution.address = address;
  institution.cnpj = cnpj;
  institution.age_group = age_group;
  institution.telephone = telephone;
  institution.email = email;
  institution.password = bcryptjs.hashSync(password, 10);
  institution.acc_children_disability = acc_children_disability;

  institutionRepository.create(institution);

  if ((institution.name.length = 0)) {
    throw new AppError(400, "Institution must have a name");
  }

  if ((institution.cnpj.length = 0 || institution.cnpj.length > 14)) {
    throw new AppError(
      400,
      "Institution must have 14 numbers and only numbers"
    );
  }

  await institutionRepository.save(institution);

  const newInstitution = {
    id: institution.id,
    name: institution.name,
    address: institution.address,
    cnpj: institution.cnpj,
    age_group: institution.age_group,
    telephone: institution.telephone,
    email: institution.email,
    acc_children_disability: institution.acc_children_disability,
  };

  console.log(newInstitution);
  return newInstitution;
};

export default createInstitutionService;
