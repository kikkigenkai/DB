import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

}
