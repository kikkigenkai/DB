import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Creator } from "./Creator.js";
import { Rate } from "./Rate.js";

@Entity({ name: 'game' })
export class Game {

    @PrimaryGeneratedColumn()
    game_id: number;

    @Column({ type: 'character varying', length: 30, nullable: false })
    gName: string;

    @Column({ type: 'character varying', length: 30, nullable: false })
    genre: string;

    @Column({ type: 'integer', nullable: false })
    price: number;

    @Column({ type: 'date', nullable: false })
    release_date: string;

    @Column({ type: 'integer', nullable: true })
    @ManyToOne(() => Creator, (creator: Creator) => creator.creator_id)
    @JoinColumn({ name: 'g_cr_id' })
    g_cr_id: number;

    @OneToMany(() => Rate, (rates) => rates.rate_game_id)
    rates: Rate[];

}