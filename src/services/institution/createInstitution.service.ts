import { IInstitutionRequest } from "../../interfaces/institutions";
import AppDataSource from "../../data-source";
import * as bcryptjs from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { Institution } from "../../entities/Institution.entity";

const createInstitutionService = async ({
  name,
  address,
  cnpj,
  ageGroup,
  phone,
  email,
  password,
  PCDAccept,
}: IInstitutionRequest) => {
  const institutionRepository = AppDataSource.getRepository(Institution);

  const institutions = await institutionRepository.find();
  const institutionAlreadyExists = institutions.find(
    (institution) => institution.cnpj === cnpj
  );
  if (institutionAlreadyExists) {
    throw new AppError(409, "Institution CNPJ already exists, try a new one");
  }

  const institutionEmailAlreadyExists = institutions.find(
    (institution) => institution.email === email
  );
  if (institutionEmailAlreadyExists) {
    throw new AppError(409, "Institution already exists, try new email ");
  }

  if (name.length <= 3) {
    throw new AppError(404, "Institution name must have more letters than 3");
  }

  if (cnpj.length > 14 || cnpj.length < 14) {
    throw new AppError(
      404,
      "Institution CNPJ must have 14 number and only numbers"
    );
  }

  const institution = new Institution();
  institution.name = name;
  institution.address = address;
  institution.cnpj = cnpj;
  institution.ageGroup = ageGroup;
  institution.phone = phone;
  institution.email = email;
  institution.password = bcryptjs.hashSync(password, 10);
  institution.PCDAccept = PCDAccept;
  
  institutionRepository.create(institution);
  await institutionRepository.save(institution);

  const newInstitution = {
    id: institution.id,
    name: name,
    address: institution.address,
    cnpj: institution.cnpj,
    ageGroup: institution.ageGroup,
    phone: institution.phone,
    email: institution.email,
    PCDAccept: institution.PCDAccept,
  };

  return newInstitution;
};

export default createInstitutionService;
