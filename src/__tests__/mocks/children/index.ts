import { Mother } from "../../../entities/Mother.entity"
import { IChildrenRequest } from "../../../interfaces/childrens"
import { mockedInstitution } from "../institutions"
import { mockedMother } from "../mother"

export const childrenData:IChildrenRequest = {
    age: 6,
    genre: "Feminino",
    name: "Maya",
    isPCD: false,
    motherId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
    isActive: true,
    institutionsId:"b855d86b-d4c9-41cd-ab98-d7fa734c6ce4"
}
export const childrenDisabilityData:IChildrenRequest = {
    age: 5,
    genre: "Masculino",
    name: "Gael",
    isPCD: true,
    isActive: true,
    motherId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
    institutionsId:"b855d86b-d4c9-41cd-ab98-d7fa734c6ce4"
    
}
