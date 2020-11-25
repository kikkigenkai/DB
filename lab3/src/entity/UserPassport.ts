import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Passport } from "./Passport.js";

@Entity({ name: 'user_passport' })
export class UserPassport {

    @PrimaryGeneratedColumn()
    user_passport_id: number;

    @ManyToOne(() => User, (user: User) => user.user_id)
    @JoinColumn({ name: 'up_user_id' })
    up_user_id: number;

    @ManyToOne(() => Passport, (passport: Passport) => passport.passport_id)
    @JoinColumn({ name: 'up_passport_id' })
    up_passport_id: number;

}