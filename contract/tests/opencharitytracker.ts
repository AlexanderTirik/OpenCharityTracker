import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Opencharitytracker } from "../target/types/opencharitytracker";
import assert from "assert";

const { SystemProgram } = anchor.web3;

describe("opencharitytracker", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Opencharitytracker as Program<Opencharitytracker>;

  const baseAccount = anchor.web3.Keypair.generate();

  it("Initialize", async () => {
    await program.methods.startOpenCharityTracker().accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([baseAccount]).rpc();
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    assert.equal(account.sum, 0);
  });

  it("Add transaction", async () => {
    await program.methods.addTransaction("10", "some hash").accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey
      }).rpc();

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    assert.equal(account.sum, 10)

    await program.methods.addTransaction("1.5", "some hash").accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey
    }).rpc();

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);

    assert.equal(account.sum, 11.5)
    assert.equal((account.transactions as any[]).length, 2)
  });

  // TODO add test to check permission
});
