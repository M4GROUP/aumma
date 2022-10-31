import { IChildrenRequest } from "../childrens"
import { IMotherRequest } from "../mothers"
import { IScheduleRequest } from "../schedules"

export interface IInstitutionRequest {
    name: string
    address: string
    cnpj: string
    age_group: number
    telephone: number
    email: string
    password: string
    acc_children_disability: boolean
    schedules: IScheduleRequest
    childrens: IChildrenRequest
    mothers: IMotherRequest
}
