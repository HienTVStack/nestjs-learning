import { ResponseApiCommon, responseApiCommon } from 'src/common/response';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateTodoDto } from 'src/dtos/todo.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Get()
  async findAll(): Promise<ResponseApiCommon<Todo[]>> {
    try {
      const todos = await this.todoService.findAll();
      if (!todos) return responseApiCommon(false, 'GET TODO LIST FAILED', [],);
      return responseApiCommon(true, 'GET TODO LIST SUCCESS', todos,);
    } catch (error: any) {
      return responseApiCommon(false, error.message);
    }
  }

  @Post()
  @ApiBody({ type: CreateTodoDto, description: 'Create todo model' })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<ResponseApiCommon<Todo>> {
    try {
      const { title, isCompleted } = createTodoDto;

      if (!title) {
        throw new Error('TITLE_IS_REQUIRED');
      }

      const todo = await this.todoService.create(title);

      return responseApiCommon(true, 'CREATE TODO SUCCESS', todo);
    } catch (error: any) {
      return responseApiCommon(false, error.message || 'INTERNAL_SERVER_ERROR');
    }
  }


  @Put()
  update(@Param('id') id: string, @Body('isCompleted') isCompleted: boolean) {
    if (!id) return;
    return this.todoService.update(id, isCompleted);
  }

  @Delete(':id')
  async deleteToDoById(@Param('id') id: number): Promise<ResponseApiCommon<Todo>> {
    try {
      if (!id) {
        return responseApiCommon(false, 'ID_TODO_IS_REQUIRED');
      }

      const response = await this.todoService.deleteTodoById(id);
      if (!response) {
        return responseApiCommon(false, 'TODO_NOT_FOUND');
      }

      return responseApiCommon(true, 'DELETE_SUCCESS');
    } catch (error) {
      return responseApiCommon(false, error?.message || 'INTERNAL_SERVER_ERROR');
    }
  }
}
