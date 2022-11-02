import { IInstitutionRequest } from "../institutions"
import { IMotherRequest } from "../mothers"


export interface IChildrenRequest {
    name: string
    age: number
    with_disability: boolean
    gender: string
    motherId: string
    institutionsId: string
}

export interface IChildrenResponse extends IChildrenRequest {
    id: string
}