import { IInstitutionRequest } from "../institutions"
import { IChildrenRequest } from "../childrens"
import { Institution } from "../../entities/Institution.entity"
import { Childrens } from "../../entities/Childrens.entity"

export interface IScheduleRequest {
    name: string,
    date: string
    isActive: boolean
    period: string
    // gender: string
    childrensId: string,
    institutionsId: string,
}

export interface IScheduleResponse {
    id: string,
    name: string,
    date: Date,
    isActive: boolean,
    period: string,
    createdAt: Date,
    childrensId: string,
    institutionId: string,
}

