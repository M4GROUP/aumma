import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

import { Mother } from "./Mother.entity"
import { Institution } from "./Institution.entity"
import { Admin } from "./Admin.entity"

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

    @ManyToOne((type) => Mother, (motherChildrens) => motherChildrens.childrens)
    mother: Mother

    @ManyToOne((type) => Institution, (childrensInInstitution) => childrensInInstitution.childrensIn)
    institution: Institution

    @ManyToOne((type) => Admin, (adminChildrens) => adminChildrens.childrens)
    admin: Admin
}

