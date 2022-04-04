import { Keypair } from '@solana/web3.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

export const fromJsonToKeypair = (keypair) => {
  const arr = Object.values(keypair._keypair.secretKey) as number[];
  const secret = new Uint8Array(arr);
  const account = Keypair.fromSecretKey(secret);
  return account;
};

export const hashString = (string) =>
  crypto.createHash('md5').update(string).digest('hex');
