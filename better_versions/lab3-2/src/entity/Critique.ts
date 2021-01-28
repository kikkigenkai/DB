import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rate } from "./Rate.js";

@Entity({ name: 'critique' })
export class Critique {

    @PrimaryGeneratedColumn()
    critique_id: number;

    @Column({ type: 'character varying', length: 30, nullable: false })
    qName: string;

    @OneToMany(() => Rate, (rates) => rates.rate_critique_id)
    rates: Rate[];
    
}