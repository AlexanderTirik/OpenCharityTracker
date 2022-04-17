import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppGateway } from './gateways/app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE),
    WebhookModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
