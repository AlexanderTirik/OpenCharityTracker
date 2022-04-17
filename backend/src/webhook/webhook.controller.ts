import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { IMonoBankTransaction } from '../services/transactionService/IMonoBankTransaction';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('monobank')
  @HttpCode(200)
  async processMonobankTransaction(
    @Body() transaction: IMonoBankTransaction,
  ): Promise<string> {
    await this.webhookService.processMonobankTransaction(transaction);
    return 'ok';
  }
}
