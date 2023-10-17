import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ResponseApiCommon, responseApiCommon } from 'src/common/response';
import { CreateFeedbackDto, ParamsSearchFeedbackGetList } from 'src/dtos/feedback.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Feedback } from './feedback.entity';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService,
    private userService: UserService) { }

  @Get()
  @ApiQuery({ type: ParamsSearchFeedbackGetList })
  async findAll(@Query() data: any): Promise<ResponseApiCommon<Feedback[]>> {
    try {
      const feedbacks = await this.feedbackService.findAll(data);
      if (!feedbacks) return responseApiCommon(false, "GET_LIST_FEEDBACK_FAILED", []);
      return responseApiCommon(true, "GET_LIST_FEEDBACK_SUCCESS", feedbacks);
    } catch (error) {
      console.error();
      return responseApiCommon(false, error?.message, { ...error })
    }
  }

  @Get(':id/detail')
  async findFeedbackById(@Param('id') id: string): Promise<ResponseApiCommon<Feedback>> {
    try {
      const feedbackFind = await this.feedbackService.findById(id);
      if (!feedbackFind) return responseApiCommon(false, "FEEDBACK_NOT_FOUNT");
      return responseApiCommon(true, "GET_FEEDBACK_SUCCESS", feedbackFind);
    } catch (error) {
      console.error(error);
      return responseApiCommon(false, error?.message, { ...error })
    }
  }

  @Post()
  @ApiBody({ type: CreateFeedbackDto })
  async createFeedback(@Body() newFeedbackDto: CreateFeedbackDto): Promise<ResponseApiCommon<Feedback>> {
    const { idUser } = newFeedbackDto;
    if (!idUser) return responseApiCommon(false, "ID_USER_IS_REQUIRED");
    const findUser: User = await this.userService.findById(idUser);
    if (!findUser) return responseApiCommon(false, "USER_NOT_FOUND");

    try {
      const newFeedback = await this.feedbackService.create(newFeedbackDto);
      if (!newFeedback) return responseApiCommon(false, "CREATE_FEEDBACK_FAILED");
      return responseApiCommon(true, "CREATE_FEEDBACK_SUCCESS", newFeedback);
    } catch (error) {
      console.error(error);
      return responseApiCommon(true, error?.message, { ...error })

    }
  }

}
