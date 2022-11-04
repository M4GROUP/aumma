import { IInstitutionRequest } from "../institutions"
import { IMotherRequest } from "../mothers"


export interface IChildrenRequest {
    name: string
    age: number
    isPCD: boolean
    genre: string
    motherId: string
    institutionsId?: string
}

export interface IChildrenResponse extends IChildrenRequest {
    id: string
}

export interface IUpdateChildren {
    age: number
    with_disability: boolean
}