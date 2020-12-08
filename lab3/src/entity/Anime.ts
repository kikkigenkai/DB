import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Genre } from "./Genre.js";
import { Review } from './Review.js';
import { Watched } from "./Watched.js";

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

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Genre, (genre: Genre) => genre.genre_id)
    @JoinColumn({ name: 'genre' })
    genre: number;

    @OneToMany(() => Review, review => review.rev_anime_id)
    reviews: Review[];

    @OneToMany(() => Watched, watched => watched.watch_anime_id)
    watches: Watched[];
}