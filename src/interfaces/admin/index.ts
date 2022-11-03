export interface IAdmRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
    isActive?: boolean
}


export interface IAdmLogin {
    email:string
    password: string
}