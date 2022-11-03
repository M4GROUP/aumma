import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Exclude } from "class-transformer";

import { Childrens } from "./Childrens.entity"
import { Admin } from "./Admin.entity"

@Entity()
export class Mother {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column({length: 240})
    address: string

    @Column()
    phone: number

    @Column({length: 128, unique: true})
    email: string

    @Column({length: 128})
    @Exclude()
    password: string

    @Column({length: 128, unique: true})
    cpf: string

    @Column({length: 128, unique: true})
    rg: string

    @Column()
    isActive: boolean;

    @OneToMany((type) => Childrens, (childrensMother) => childrensMother.mother)
    childrens: Childrens[]

    @ManyToOne((type) => Admin, (adminMother) => adminMother.institutions)
    admin: Admin
}

