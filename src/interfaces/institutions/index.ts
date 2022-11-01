import { IChildrenRequest } from "../childrens"
import { IMotherRequest } from "../mothers"
import { IScheduleRequest } from "../schedules"

export interface IInstitutionRequest {
    name: string
    address: string
    cnpj: string
    ageGroup: number
    phone: number
    email: string
    password: string
    PCDAccept: boolean
    schedules?: IScheduleRequest
    childrens?: IChildrenRequest
    mothers?: IMotherRequest
}
