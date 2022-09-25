import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { TodoDTO } from './app.dto';

const prisma = new PrismaClient();

async function main(todo_val) {
  const result = await prisma.todo.create({
    data: {
      content: todo_val,
    },
  });
  console.log(result);
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('demo_test')
  getDemoTest(): string {
    return 'demo test';
  }

  @Post('post_data')
  postData(@Body() new_todo: TodoDTO) {
    console.log(new_todo);
    const todo_val = new_todo['content'];
    console.log(todo_val);
    main(todo_val)
      .catch((e) => console.error(e))
      .finally(async () => await prisma.$disconnect());
    return {
      code: 0,
      message: '请求成功',
    };
  }
}
