import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./Questions.js";
import { Tags } from "./Tags.js";

@Entity({ name: 'QuestionTagsBinding' })
export class QTB {

    @PrimaryGeneratedColumn()
    qtId: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Tags, (tags: Tags) => tags.tagId)
    @JoinColumn({ name: 'qt_tag_id' })
    qt_tag_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Questions, (questions: Questions) => questions.questionId)
    @JoinColumn({ name: 'qt_question_id' })
    qt_question_id: number;
}