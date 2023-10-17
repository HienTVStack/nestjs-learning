import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User]), ],
  controllers: [FeedbackController],
  providers: [FeedbackService, UserService],
  exports: [FeedbackService, TypeOrmModule.forFeature([Feedback])],
})
export class FeedbackModule { }
