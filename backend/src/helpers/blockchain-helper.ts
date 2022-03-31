import { Wallet } from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import crypto from 'crypto';

export const fromJsonToWallet = (keypair) => {
  const arr = Object.values(keypair._keypair.secretKey) as number[];
  const secret = new Uint8Array(arr);
  const account = Keypair.fromSecretKey(secret);
  const wallet = new Wallet(account);
  return wallet;
};

export const hashString = (string) =>
  crypto.createHash('md5').update(string).digest('hex');
