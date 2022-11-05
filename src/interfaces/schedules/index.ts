import { IInstitutionRequest } from "../institutions"
import { IChildrenRequest } from "../childrens"

export interface IScheduleRequest {
    name: string,
    date: Date
    isActive: boolean
    period: string
    gender: string
    idChildren: string
    idIntitution: string
}

