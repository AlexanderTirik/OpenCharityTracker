import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE), WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
