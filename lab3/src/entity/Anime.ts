import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Genre } from "./Genre.js";

@Entity({ name: 'anime' })
export class Anime {

    @PrimaryGeneratedColumn()
    anime_id: number;

    @Column('character varying', { length: 40, nullable: false })
    a_name: string;

    @Column('character varying', { length: 500, nullable: false })
    description: string;

    @Column({ type: 'integer', nullable: false })
    series: number;

    @ManyToOne(() => Genre, (genre: Genre) => genre.genre_id)
    @JoinColumn({ name: 'genre' })
    genre: number;

}