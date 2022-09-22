import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  saveData(todo_str) {
    return 'HelloWorld';
  }
}
