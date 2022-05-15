import { Injectable } from '@nestjs/common';
import { blockchainService } from './services/blockchain-service';

@Injectable()
export class AppService {
  createAccount(): Promise<string> {
    return blockchainService.createAccount();
  }
}
