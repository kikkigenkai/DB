import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publisher } from './Publisher.js';
import { Creator } from './Creator.js';

@Entity()
export class Hire {

    @PrimaryGeneratedColumn()
    hire_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Publisher, (publisher: Publisher) => publisher.publisher_id)
    @JoinColumn({ name: 'hire_publisher_id' })
    hire_publisher_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Creator, (creator: Creator) => creator.creator_id)
    @JoinColumn({ name: 'hire_creator_id' })
    hire_creator_id: number;

}