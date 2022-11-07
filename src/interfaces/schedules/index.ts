import { IInstitutionRequest } from "../institutions"
import { IChildrenRequest } from "../childrens"

export interface IScheduleRequest {
    name: string,
    date: string
    isActive: boolean
    period: string
    /* gender: string */
    idChildren: string
    idInstitution: string
}

export interface IScheduleResponse {
    id: string,
    name: string,
    date: Date,
    isActive: boolean,
    period: string,
    createdAt: Date,
    idChildren: string,
    idInstitution: string,
}

