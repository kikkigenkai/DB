import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer.js";
import { Questions } from "./Questions.js";

@Entity({ name: 'Users' })
export class Users {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ type: 'character varying', length: 50, nullable: false })
    username: string;

    @Column({ type: 'date', nullable: false })
    reg_date: string;

    @Column({ type: 'integer', nullable: false })
    rating: number;

    @Column({ type: 'boolean', nullable: false })
    confirmed: boolean;

    @OneToMany(() => Questions, questions => questions.authorId)
    questions: Questions[];

    @OneToMany(() => Answer, answers => answers.a_author_id)
    answers: Answer[];
}