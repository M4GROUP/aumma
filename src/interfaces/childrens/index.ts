import { Institution } from "../../entities/Institution.entity"
import { Mother } from "../../entities/Mother.entity"
import { IInstitutionRequest } from "../institutions"
import { IMotherRequest } from "../mothers"


export interface IChildrenRequest {
    name: string
    age: number
    isPCD: boolean
    isActive: boolean
    genre: string
    motherId: string
    institutionsId?: string
}

export interface IChildrenResponse extends IChildrenRequest {
    id: string
}

export interface IUpdateChildren {
    name?:string
    age: number
    isPCD: boolean
}