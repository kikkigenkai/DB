import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Anime } from "./Anime.js";

@Entity({ name: 'genre' })
export class Genre {

    @PrimaryGeneratedColumn()
    genre_id: number;

    @Column('character varying', { length: 40, nullable: false })
    g_name: string;

    @OneToMany(() => Anime, anime => anime.genre)
    animes: Anime[]
}