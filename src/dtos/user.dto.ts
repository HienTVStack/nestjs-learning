import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String
  })
  fullName: string;

  // @ApiProperty({
  //   type: Boolean,
  //   default: false
  // })
  // is_active: boolean
}