import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm"

import { Mother } from "./Mother.entity"
import { Institution } from "./Institution.entity"
import { Admin } from "./Admin.entity"
import { Schedules } from "./Schedules.entity"

@Entity()
export class Childrens {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column()
    age: number

    @Column()
    isPCD: boolean

    @Column()
    genre: string

    @Column({default:true})
    isActive: boolean

    @ManyToOne((type) => Mother, (motherChildrens) => motherChildrens.childrens)
    mother: Mother

    @ManyToOne((type) => Admin, (adminChildrens) => adminChildrens.childrens)
    admin: Admin

    @OneToMany((type) => Schedules, (schedules) => schedules.childrens)
    schedules: Schedules[]
}

