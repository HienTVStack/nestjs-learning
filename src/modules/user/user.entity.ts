import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "../feedback/feedback.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany( () => Feedback, feedback => feedback.id)
  feedbacks: Feedback[];
}