import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anime } from "./Anime.js";
import { User } from "./User.js";

@Entity({ name: 'watched' })
export class Watched {

    @PrimaryGeneratedColumn()
    a_watched_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Anime, (anime: Anime) => anime.anime_id)
    @JoinColumn({ name: 'watch_anime_id' })
    watch_anime_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => User, (user: User) => user.user_id)
    @JoinColumn({ name: 'watch_user_id' })
    watch_user_id: number;

}