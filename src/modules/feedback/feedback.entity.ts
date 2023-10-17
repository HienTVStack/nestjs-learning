import { RATING_FEEDBACK, RATING_FEEDBACK_TYPE } from 'src/constants';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity("feedback")
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: RATING_FEEDBACK.NORMAL,
    enum: RATING_FEEDBACK,
  })
  rating: RATING_FEEDBACK_TYPE

  @Column()
  note?: string;
  
  @Column({ default: new Date() })
  created_at: Date

  @Column({ default: false })
  is_deleted: boolean;

  @ManyToOne(() => User, user => user.id)
  idUser: string;
}