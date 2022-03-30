import { Button, useColorMode } from "@chakra-ui/react";

const Home = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      Home
      <Button onClick={() => {toggleColorMode()}} />
    </div>
  );
}

export default Home;
