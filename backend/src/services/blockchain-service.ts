import {
  Connection,
  clusterApiUrl,
  Cluster,
  ConfirmOptions,
  PublicKey,
  Keypair,
} from '@solana/web3.js';
import { config } from 'src/config';
import { fromJsonToWallet, hashString } from 'src/helpers/blockchain-helper';
import { Program, Provider } from '@project-serum/anchor';
import kp from 'src/keypair.json';
import fs from 'fs';

class BlockchainService {
  private connection: Connection;
  private program: Program;
  private provider: Provider;
  constructor() {
    const connection = new Connection(
      clusterApiUrl(config.blockchainNet as Cluster),
    );
    this.provider = new Provider(
      connection,
      fromJsonToWallet(kp),
      'processed' as ConfirmOptions,
    );
    const programId = new PublicKey(config.programId);
    const idl = JSON.parse(
      fs.readFileSync('src/opencharitytracker.json', 'utf8'),
    );
    this.program = new Program(idl, programId, this.provider);
  }

  async createAccount(): Promise<string> {
    const account = await Keypair.generate();
    await this.program.rpc.startOpenCharityTracker({
      accounts: {
        baseAccount: account.publicKey,
        user: this.provider.wallet.publicKey,
      },
    });
    return JSON.stringify(account);
  }

  async sendTransactionToBlockchain(account, amount): Promise<void> {
    const lastHash = await this.getLastHash(account);
    const hash = hashString(`${lastHash}${amount}`);
    await this.program.rpc.addTransaction(amount, hash, {
      accounts: {
        baseAccount: account.publicKey,
        user: this.provider.wallet.publicKey,
      },
    });
  }
  async getLastHash(account): Promise<string> {
    const programAccount = await this.program.account.baseAccount.fetch(
      account.publicKey,
    );
    const { transactions } = programAccount;
    return transactions[transactions.length - 1].hash;
  }
}

const blockchainService = new BlockchainService();

export { blockchainService };
