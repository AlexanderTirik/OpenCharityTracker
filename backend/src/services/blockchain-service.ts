import {
  Connection,
  clusterApiUrl,
  Cluster,
  ConfirmOptions,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { config } from 'src/config';
import { fromJsonToKeypair, hashString } from 'src/helpers/blockchain-helper';
import { Program, Provider } from '@project-serum/anchor';
import { getLocalJSON } from 'src/helpers/file-helper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

class BlockchainService {
  private program: Program;
  private provider: Provider;
  constructor() {
    const connection = new Connection(clusterApiUrl(config.blockchainNet));
    this.provider = new Provider(
      connection,
      new anchor.Wallet(fromJsonToKeypair(getLocalJSON('keypair'))),
      { preflightCommitment: 'processed' },
    );

    const programId = new PublicKey(config.programId);
    const idl = getLocalJSON('opencharitytracker');
    this.program = new Program(idl, programId, this.provider);
  }

  async createAccount(): Promise<string> {
    const account = anchor.web3.Keypair.generate();
    await this.program.methods
      .startOpenCharityTracker()
      .accounts({
        baseAccount: account.publicKey,
        user: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([account])
      .rpc();
    // Test account need only public key
    fs.writeFileSync('./src/account.json', JSON.stringify(account));
    return JSON.stringify(account);
  }

  async sendTransactionToBlockchain(account, amount: number): Promise<void> {
    const lastHash = await this.getLastHash(account);
    const hash = hashString(`${lastHash}${amount}`);
    await this.program.methods
      .addTransaction(`${amount}`, hash)
      .accounts({
        baseAccount: account.publicKey,
        user: this.provider.wallet.publicKey,
      })
      .rpc();
  }
  async getLastHash(account): Promise<string> {
    const programAccount = await this.program.account.baseAccount.fetch(
      account.publicKey,
    );
    const { transactions } = programAccount;
    return transactions.length
      ? transactions[transactions.length - 1].hash
      : '';
  }
}

const blockchainService = new BlockchainService();

export { blockchainService };
