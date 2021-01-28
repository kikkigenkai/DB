import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hire } from './Hire.js';

@Entity({ name: 'publisher' })
export class Publisher {

    @PrimaryGeneratedColumn()
    publisher_id: number;

    @Column({ type: 'character varying', length: 30, nullable: false })
    pubName: string;

    @OneToMany(() => Hire, (hires) => hires.hire_publisher_id)
    hires: Hire[];
    
}