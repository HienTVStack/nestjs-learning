import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedbackDto, ParamsSearchFeedbackGetList } from 'src/dtos/feedback.dto';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(data: ParamsSearchFeedbackGetList): Promise<Feedback[]> {
    const options: ParamsSearchFeedbackGetList = { ...data };
    const feedbacks = await this.feedbackRepository.findBy(options)
    return feedbacks;
  }

  async findById(id: string): Promise<Feedback> {
    return this.feedbackRepository.findOneBy({ id });
  }

  async create(data: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbackRepository.save(data)
  }
}