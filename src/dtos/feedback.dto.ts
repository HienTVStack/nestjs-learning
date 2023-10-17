import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RATING_FEEDBACK, RATING_FEEDBACK_TYPE } from 'src/constants';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsEnum(RATING_FEEDBACK)
  @ApiProperty({
    type: String,
    enum: RATING_FEEDBACK
  })
  rating: RATING_FEEDBACK_TYPE;

  @IsString()
  @ApiProperty({
    type: String,
  })
  note?: string;

  @IsUUID()
  @ApiProperty({
    type: String,
  })
  idUser: string;
}

export class UpdateFeedbackDto {
  rating: RATING_FEEDBACK_TYPE
}

export class ParamsSearchFeedbackGetList {
  @ApiProperty({ type: String, required: false })
  idUser: string;

  @ApiProperty({ type: String, enum: RATING_FEEDBACK, required: false })
  rating: RATING_FEEDBACK_TYPE;
}