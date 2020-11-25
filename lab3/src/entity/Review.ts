import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User.js';
import { Anime } from './Anime.js';

@Entity({ name: 'review' })
export class Review {

    @PrimaryGeneratedColumn()
    review_id: number;

    @Column({ type: 'character varying', length: 1000, nullable: false })
    r_text: string;

    @ManyToOne(() => User, (user: User) => user.user_id)
    @JoinColumn({ name: 'rev_user_id' })
    rev_user_id: number;

    @ManyToOne(() => Anime, (anime: Anime) => anime.anime_id)
    @JoinColumn({ name: 'rev_anime_id' })
    rev_anime_id: number;

}