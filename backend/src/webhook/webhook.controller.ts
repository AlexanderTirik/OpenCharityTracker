import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { IMonoBankTransaction } from '../services/IMonoBankTransaction';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('monobank')
  @HttpCode(200)
  processMonobankTransaction(
    @Body() transaction: IMonoBankTransaction,
  ): string {
    this.webhookService.processMonobankTransaction(transaction);
    return 'ok';
  }
}
