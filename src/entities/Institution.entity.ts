import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm"

import { Schedules } from "./Schedules.entity"
import { Admin } from "./Admin.entity"
import { Exclude } from "class-transformer"

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({length: 128})
    name: string

    @Column({length: 128})
    @Exclude()

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

    @ManyToOne((type) => Admin, (adminInstitutions) => adminInstitutions.institutions)
    admin: Admin
}

