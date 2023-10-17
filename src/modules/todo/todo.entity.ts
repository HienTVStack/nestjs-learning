import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  isCompleted: boolean;
}