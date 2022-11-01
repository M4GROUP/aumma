import { IChildrenRequest } from "../childrens"
import { IInstitutionRequest } from "../institutions"
import { IScheduleRequest } from "../schedules"

export interface IMotherRequest {
    name: string
    address: string
    telephone: number
    email: string
    password: string
    cpf: string
    rg: string
    schedules?: IScheduleRequest
    childrens?: IChildrenRequest
    institutions?: IInstitutionRequest
}

export interface IMotherNewValues {
    id: string
    name: string
    address: string
    telephone: number
    email: string
    password: string
    cpf: string
    rg: string
}

export interface IMotherLogin {
    name: string
    password: string
}
