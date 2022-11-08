export interface IScheduleRequest {
    name: string,
    date: string
    isActive?: boolean
    period: string
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

