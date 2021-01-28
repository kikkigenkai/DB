import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Critique } from "./Critique.js";
import { Game } from "./Game.js";

@Entity({ name: 'rate' })
export class Rate {

    @PrimaryGeneratedColumn()
    rate_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Game, (game: Game) => game.game_id)
    @JoinColumn({ name: 'rate_game_id' })
    rate_game_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Critique, (critique: Critique) => critique.critique_id)
    @JoinColumn({ name: 'rate_critique_id' })
    rate_critique_id: number;

}