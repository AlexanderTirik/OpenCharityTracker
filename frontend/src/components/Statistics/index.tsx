import { Button, useColorMode } from "@chakra-ui/react";

const Statistics = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      Stats
      <Button onClick={() => {toggleColorMode()}} />
    </div>
  );
}

export default Statistics;
