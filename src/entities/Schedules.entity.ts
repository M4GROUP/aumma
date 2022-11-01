import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Admin } from "./Admin.entity"

import { Institution } from "./Institution.entity"
import { Mother } from "./Mother.entity"

@Entity()
export class Schedules {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    date: Date

    @Column()
    isActive: boolean

    @Column()
    period: string

    @ManyToOne((type) => Institution, (institutionsSchedules) => institutionsSchedules.schedules)
    institution: Institution

    @ManyToOne((type) => Mother, (motherSchedules) => motherSchedules.schedulesMother)
    mother: Mother

    @ManyToOne((type) => Admin, (motherSchedules) => motherSchedules.schedules)
    admin: Admin
}

