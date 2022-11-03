import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"

import { Schedules } from "./Schedules.entity"
import { Childrens } from "./Childrens.entity"
import { Mother } from "./Mother.entity"
import { Admin } from "./Admin.entity"

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column({length: 128})
    password: string

    @Column({length: 240})
    address: string

    @Column({length: 128, unique: true})
    cnpj: string

    @Column()
    ageGroup: number

    @Column()
    phone: number

    @Column({default:true})
    isActive: boolean

    @Column({length: 128, unique: true})
    email: string

    @Column()
    PCDAccept: boolean

    @OneToMany((type) => Schedules, (schedulesInstitutions) => schedulesInstitutions.institution )
    schedules: Schedules[]
   
    @ManyToMany((type) => Childrens, (childrensInInstitutions) => childrensInInstitutions.institution)
    childrensIn: Childrens[]

    @ManyToMany((type) => Mother, (motherInstitution) => motherInstitution.institutionsMother)
    mother: Mother[]

    @ManyToOne((type) => Admin, (adminInstitutions) => adminInstitutions.institutions)
    admin: Admin
}

