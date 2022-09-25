import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';


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
  postData(@Body() new_todo): string {
    console.log(new_todo['param1']);
    return 'HELLO WORLD';
  }
}
