import { createSlice } from "@reduxjs/toolkit";
import { Program, Provider, Idl, Wallet } from "@project-serum/anchor";
import {
  Connection,
  clusterApiUrl,
  Cluster,
  ConfirmOptions,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { env } from "../config/env";
import idl from "../opencharitytracker.json";

interface SolanaState {
  provider: Provider;
  program: Program;
}

const connection = new Connection(clusterApiUrl(env.blockchainNet as Cluster));

const provider = new Provider(
  connection,
  // @ts-ignore
  window.solana,
  "processed" as ConfirmOptions
);

const programId = new PublicKey(env.programId);

const program = new Program(idl as Idl, programId, provider);

const initialState: SolanaState = {
  provider,
  program,
};

export const solanaSlice = createSlice({
  name: "solana",
  initialState,
  reducers: {},
});

export default solanaSlice.reducer;
