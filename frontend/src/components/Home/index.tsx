import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useLazyCreateQuery, useLazySendQuery } from "../../services/api";
import kp from '../../account.json';
import { Cluster, clusterApiUrl, ConfirmOptions, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Idl, Provider, BN } from "@project-serum/anchor";
import { env } from "../../config/env";
import idl from "../../opencharitytracker.json";

const Home = () => {
  const [sendQuery] = useLazySendQuery();
  const [createQuery] = useLazyCreateQuery();
  const [transactions, setTransactions] = useState();
  const onSend = () => {
    sendQuery({});
  }
  const onCreate = () => {
    createQuery({});
  }

  // const program = useAppSelector((state) => state.solana.program);

  const getTransactions = async() => {
    try {
      const connection = new Connection(clusterApiUrl(env.blockchainNet as Cluster));

      const provider = new Provider(
        connection,
        // @ts-ignore
        window.solana,
        "processed" as ConfirmOptions
      );

      const programId = new PublicKey(env.programId);
        // @ts-ignore
      const program = new Program(idl, programId, provider);

      const arr = Object.values(kp._keypair.secretKey);
      const secret = new Uint8Array(arr)
      const baseAccount = Keypair.fromSecretKey(secret)
//FS26vz6rte9HeGafJLHhzQD5tD6CAa3cMj5NXLeKebgJ
console.log(baseAccount.publicKey.toString())
      // const account = await program.account.baseAccount.fetch(new PublicKey("9Xwg3E1deJYmM2s3VerZxyrhEL4FBDXFRgbrbNNEDgwT"));
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log(new BN(account.sum).toNumber())
      console.log("Got the account", account)
      setTransactions(account.transactions)
  
    } catch (error) {
      console.log(error)
      setTransactions(undefined);
    }
  }

  return (
    <div>
      Home
      <Button onClick={() => onSend()}>Send</Button>
      <Button onClick={() => onCreate()}>Create</Button>
      <Button onClick={() => getTransactions()}>Get Transactions</Button>
    </div>
  );
}

export default Home;
