import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from "typeorm";
import { Admin } from "./Admin.entity";
import { Childrens } from "./Childrens.entity";

import { Institution } from "./Institution.entity";
import { Mother } from "./Mother.entity";

@Entity()
export class Schedules {
    
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ length: 128 })
    name: string;

    @Column({ type: "date" })
    date: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    period: string;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;

    @Column()
    idChildren: string;

    @Column()
    idInstitution: string;

    @ManyToOne(
        () => Institution,
    )
    institution: Institution;

    @ManyToOne((type) => Admin, (motherSchedules) => motherSchedules.schedules)
    admin: Admin;

    @ManyToOne(
        () => Childrens,
        /* (childrensSchedules) => childrensSchedules.schedules */
    )
    childrens: Childrens;
    newSchedule: Schedules;
}
