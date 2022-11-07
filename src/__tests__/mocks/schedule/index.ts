import { IChildrenRequest } from "./../../../interfaces/childrens/index";
import { Childrens } from "../../../entities/Childrens.entity";
import { IScheduleRequest } from "../../../interfaces/schedules";
import { childrenData } from "../children";
import { mockedInstitution, mockedInstitutionWithoutCNPJ } from "../institutions";
import { mockedMother } from "../mother";

export const mockedSchedules: IScheduleRequest = {
  name: "Maya",
    // mother: mockedMother,
  date: "07/11/2022",
  // gender: "female",
  childrensId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
  isActive: true,
  period: "8h",
  institutionsId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4"
}
