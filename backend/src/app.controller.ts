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
  @Get('/create')
  getCreate(): Promise<string> {
    return this.appService.createAccount();
  }
  @Get('/send')
  getSend(): Promise<void> {
    return this.appService.sendTransactionToBlockchain();
  }
}
