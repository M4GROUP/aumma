import { IScheduleRequest } from "../../../interfaces/schedules";
import { mockedInstitutionWithoutCNPJ } from "../institutions";
import { mockedMother } from "../mother";

export const mockedSchedules: IScheduleRequest = {
  mother: mockedMother,
  date: new Date,
  gender: "female",
  isActive: true,
  period: "8h",
  intitution: mockedInstitutionWithoutCNPJ
}
