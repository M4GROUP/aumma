import { Exclude } from "class-transformer"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Childrens } from "./Childrens.entity"

import { Institution } from "./Institution.entity"
import { Mother } from "./Mother.entity"
import { Schedules } from "./Schedules.entity"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column({length: 128})
    @Exclude()
    password: string

    @Column({length: 128, unique: true})
    email: string

    @Column()
    isAdm: boolean

    @Column({default:true})
    isActive: boolean

    @OneToMany((type) => Institution, (adminInstitutions) => adminInstitutions.admin)
    institutions: Institution[]

    @OneToMany((type) => Mother, (mothersAdmin) => mothersAdmin.admin)
    mothers: Mother[]

    @OneToMany((type) => Childrens, (childrensAdmin) => childrensAdmin.admin)
    childrens: Childrens[]

    @OneToMany((type) => Schedules, (childrensAdmin) => childrensAdmin.admin)
    schedules: Schedules[]
}
