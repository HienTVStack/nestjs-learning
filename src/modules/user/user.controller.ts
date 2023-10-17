import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ResponseApiCommon, responseApiCommon } from 'src/common/response';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() data: CreateUserDto): Promise<ResponseApiCommon<User>> {
    try {
      const newUser: User = await this.userService.create(data);
      if (!newUser) return responseApiCommon(false, "CREATE_NEW_USER_FAILED");
      return responseApiCommon(true, "CREATE_USER_SUCCESS", newUser);
    } catch (error) {
      return responseApiCommon(false, error?.message)
    }
  }

  @Get()
  async findAll(): Promise<ResponseApiCommon<User[]>> {
    try {
      const users: User[] = await this.userService.findAll();
      if (!users) return responseApiCommon(false, "GET_LIST_USER_FAILED");
      return responseApiCommon(true, "GET_LIST_USER_SUCCESS", users);
    } catch (error) {
      return responseApiCommon(false, error?.message)
    }
  }

}
