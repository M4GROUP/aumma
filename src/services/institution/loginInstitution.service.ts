import { IInstitutionLogin } from "../../interfaces/institutions";
import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";

const institutionLoginService = async ({ email, password }: IInstitutionLogin) => {
  const institutionRepository = AppDataSource.getRepository(Institution);

  const intitutions = await institutionRepository.find();

  const account = intitutions.find((institution) => institution.email === email);

  if (!account) {
    throw new AppError(401, "Account not found");
  }

  if (!bcryptjs.compareSync(password, account.password)) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = jwt.sign(
    {
      email: email,
      id: account.id,
      // AdminID: account.admin.id
    },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject:account.id }
  );

  return token;
};

export default institutionLoginService;
