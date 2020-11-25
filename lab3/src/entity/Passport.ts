import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
}