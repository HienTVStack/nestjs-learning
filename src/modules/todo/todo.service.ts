import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(title: string): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    return this.todoRepository.save(todo);
  }

  async update(id: string, isCompleted: boolean): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    todo.isCompleted = isCompleted;
    return this.todoRepository.save(todo);
  }

  async deleteTodoById(id: number): Promise<Boolean> {
    const response = await this.todoRepository.delete(id);
    return true;
  }

  // async update(id: number, isCompleted: boolean): Promise<Todo> {
  //   const todo = await this.todoRepository.findOne(id);
  //   todo.isCompleted = isCompleted;
  //   return this.todoRepository.save(todo);
  // }
}
