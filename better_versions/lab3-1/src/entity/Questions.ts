import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer.js";
import { QTB } from "./QTB.js";
import { Users } from "./Users.js";

@Entity({ name: 'Questions' })
export class Questions {

    @PrimaryGeneratedColumn()
    questionId: number;

    @Column({ type: 'character varying', length: 50, nullable: false })
    qHeader: string;

    @Column({ type: 'character varying', length: 500, nullable: false })
    qText: string;

    @Column({ type: 'date', nullable: false })
    creationDate: string;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Users, (users: Users) => users.userId)
    @JoinColumn({ name: 'authorId' })
    authorId: number;

    @OneToMany(() => QTB, qtb => qtb.qt_question_id)
    questions: QTB[];

    @OneToMany(() => Answer, answers => answers.a_question_id)
    answers: Answer[];
}