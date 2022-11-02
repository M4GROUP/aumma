import { IChildrenRequest } from "../childrens"
import { IInstitutionRequest } from "../institutions"
import { IScheduleRequest } from "../schedules"

export interface IMotherRequest {
    name: string
    address: string
    phone: number
    email: string
    password: string
    cpf: string
    rg: string
}

export interface IMother {
    id: string
    name: string
    address: string
    phone: number
    email: string
    password: string
    cpf: string
    rg: string
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
    email: string
    password: string
}
