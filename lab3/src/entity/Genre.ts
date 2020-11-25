import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'genre' })
export class Genre {

    @PrimaryGeneratedColumn()
    genre_id: number;

    @Column('character varying', { length: 40, nullable: false })
    g_name: string;

}