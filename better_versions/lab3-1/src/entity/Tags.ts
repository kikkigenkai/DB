import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QTB } from "./QTB.js";

@Entity({ name: 'Tags' })
export class Tags {

    @PrimaryGeneratedColumn()
    tagId: number;

    @Column({ type: 'character varying', length: 50, nullable: false })
    tName: string;

    @Column({ type: 'character varying', length: 500, nullable: false })
    description: string;

    @OneToMany(() => QTB, qtb => qtb.qt_tag_id)
    questions: QTB[];
    
}