import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ITransaction } from './services/ITransaction';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/transactions')
  getHello(): ITransaction[] {
    return this.appService.getTransactions();
  }
}