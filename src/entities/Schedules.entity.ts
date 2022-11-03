import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Admin } from "./Admin.entity"
import { Childrens } from "./Childrens.entity"

import { Institution } from "./Institution.entity"
import { Mother } from "./Mother.entity"

@Entity()
export class Schedules {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column()
    date: Date

    @Column()
    isActive: boolean

    @Column()
    period: string

    @CreateDateColumn({name: "createdAt"})
    createdAt: Date

    @DeleteDateColumn({name: "deletedAt"})
    deletedAt: Date

    @Column()
    idChildren: string

    @Column()
    idInstitution: string

    @ManyToOne((type) => Institution, (institutionsSchedules) => institutionsSchedules.schedules)
    institution: Institution

    @ManyToOne((type) => Mother, (motherSchedules) => motherSchedules.schedulesMother)
    mother: Mother

    @ManyToOne((type) => Admin, (motherSchedules) => motherSchedules.schedules)
    admin: Admin

    @ManyToOne((type) => Childrens, (childrensSchedules) => childrensSchedules.schedules)
    childrens: Childrens
}

