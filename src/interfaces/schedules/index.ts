import { IInstitutionRequest } from "../institutions"
import { IMotherRequest } from "../mothers"

export interface IScheduleRequest {
    isActive: boolean
    date: Date
    period: string
    gender: string
    mother: IMotherRequest
    intitution: IInstitutionRequest
}
