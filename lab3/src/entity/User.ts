import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { UserPassport } from "./UserPassport.js";
import { Watched } from "./Watched.js";

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column('character varying', { length: 50, nullable: false })
    username: string;

    @Column({ type: 'date', nullable: false })
    registry_date: string;

    @Column({ type: 'boolean', nullable: false })
    confirmed: boolean;

    @OneToMany(() => Watched, watched => watched.watch_user_id)
    watches: Watched[];

    @OneToMany(() => UserPassport, userpassport => userpassport.up_user_id)
    userpassport: UserPassport[];
}
