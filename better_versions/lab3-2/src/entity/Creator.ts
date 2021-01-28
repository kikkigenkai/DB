import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from './Game.js';
import { Hire } from "./Hire.js";

@Entity({ name: 'creator' })
export class Creator {

    @PrimaryGeneratedColumn()
    creator_id: number;

    @Column({ type: 'character varying', length: 30, nullable: false })
    crName: string;

    @Column({ type: 'boolean', nullable: false })
    active: boolean;
    
    @OneToMany(() => Game, games => games.g_cr_id)
    games: Game[];

    @OneToMany(() => Hire, (hires) => hires.hire_creator_id)
    hires: Hire[];
    
}