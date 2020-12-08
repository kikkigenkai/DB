import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Unique, Column } from "typeorm";
import { User } from "./User.js";
import { Passport } from "./Passport.js";

@Entity({ name: 'user_passport' })
@Unique(['up_user_id', 'up_passport_id'])
export class UserPassport {

    @PrimaryGeneratedColumn()
    user_passport_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => User, (user: User) => user.user_id)
    @JoinColumn({ name: 'up_user_id' })
    up_user_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Passport, (passport: Passport) => passport.passport_id)
    @JoinColumn({ name: 'up_passport_id' })
    up_passport_id: number;

}