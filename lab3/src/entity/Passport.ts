import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPassport } from "./UserPassport.js";

@Entity({ name: 'passport' })
export class Passport {
    
    @PrimaryGeneratedColumn()
    passport_id: number;

    @Column('character varying', { length: 15, nullable: false })
    name: string;

    @Column('character varying', { length: 20, nullable: false })
    surname: string;

    @Column({ type: 'date', nullable: false })
    birth_date: string;
    
    @OneToMany(() => UserPassport, userpassport => userpassport.up_passport_id)
    userpassport: UserPassport[];
}