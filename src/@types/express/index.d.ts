import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            institution: {
                id: string
                // AdminID:{
                //     id:string
                // }
            },
            adm:{
                id:string
                isAdm:boolean
            },
            mother:{
                sub:string
            }
        }
    }
}