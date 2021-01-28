import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.js";

@Entity({ name: 'Google_Profile' })
export class GoogleProfile {

    @PrimaryGeneratedColumn()
    gpId: number;

    @Column({ type: 'character varying', length: 50, nullable: false })
    email: string;

    @Column({ type: 'character varying', length: 50, nullable: false })
    nickname: string;

    @Column({ type: 'integer', nullable: false })
    adIdentifier: number;

    @Column({ type: 'integer', nullable: false })
    @OneToOne(() => Users)
    @JoinColumn({ name: 'questionUser' })
    questionUser: number;

}