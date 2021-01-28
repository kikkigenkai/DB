import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./Questions.js";
import { Users } from "./Users.js";


@Entity({ name: 'Answer' })
export class Answer {

    @PrimaryGeneratedColumn()
    answerId: number;

    @Column({ type: 'character varying', length: 50, nullable: false })
    aHeader: string;

    @Column({ type: 'character varying', length: 500, nullable: false })
    aText: string;

    @Column({ type: 'date', nullable: false })
    aCreationDate: string;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Users, (users: Users) => users.userId)
    @JoinColumn({ name: 'a_author_id' })
    a_author_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Questions, (questions: Questions) => questions.questionId)
    @JoinColumn({ name: 'a_question_id' })
    a_question_id: number;
}