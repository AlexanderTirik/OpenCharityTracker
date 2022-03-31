import {
  Connection,
  clusterApiUrl,
  Cluster,
  ConfirmOptions,
  PublicKey,
} from '@solana/web3.js';
import { config } from 'src/config';
import { fromJsonToWallet, hashString } from 'src/helpers/blockchain-helper';
import { Program, Provider } from '@project-serum/anchor';
import kp from 'src/keypair.json';
import idl from 'src/idl.json';

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
    this.program = new Program(
      idl,
      new PublicKey(idl.metadata.address),
      this.provider,
    );
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
