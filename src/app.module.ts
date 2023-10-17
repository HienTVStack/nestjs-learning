import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './modules/todo/todo.controller';
import { TodoModule } from './modules/todo/todo.module';
import { TodoService } from './modules/todo/todo.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { FeedbackController } from './modules/feedback/feedback.controller';
import { FeedbackService } from './modules/feedback/feedback.service';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { Todo } from './modules/todo/todo.entity';
import { Feedback } from './modules/feedback/feedback.entity';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [Todo, Feedback, User],
      logging: ['error', 'warn', 'log'],
      synchronize: true,
    }),
    TodoModule,
    UserModule,
    FeedbackModule,
  ],
  controllers: [AppController, TodoController, UserController, FeedbackController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    TodoService,
    UserService,
    FeedbackService,
  ],
})
export class AppModule { }
