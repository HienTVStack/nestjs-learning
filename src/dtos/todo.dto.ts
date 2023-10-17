import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: "title is string" })
  @IsNotEmpty({message: 'title is required'})
  @ApiProperty({
    type: String
  })
  title: string;

  @ApiProperty({
    type: Boolean,
    default: false
  })
  isCompleted: boolean;
}