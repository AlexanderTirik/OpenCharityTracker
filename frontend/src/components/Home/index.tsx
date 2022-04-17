import { Button } from "@chakra-ui/react";
import { useLazyCreateQuery, useLazySendQuery } from "../../services/api";
import kp from '../../account.json';
import { Keypair } from "@solana/web3.js";
import { useAppSelector } from "../../hooks/redux";

const Home = () => {
  const [sendQuery] = useLazySendQuery();
  const [createQuery] = useLazyCreateQuery();
  const onSend = () => {
    sendQuery({});
  }
  const onCreate = () => {
    createQuery({});
  }

  const program = useAppSelector((state) => state.solana.program);

  const getTransactions = async() => {
    try {
      const arr = Object.values(kp._keypair.secretKey);
      const secret = new Uint8Array(arr)
      const baseAccount = Keypair.fromSecretKey(secret)
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log(baseAccount.publicKey.toString());
      console.log("Got the account", account)  
    } catch (error) {
      console.log(error)
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
