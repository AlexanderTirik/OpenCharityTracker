import { Box, Progress } from "@chakra-ui/react";

  
  interface IProps {
    amount: string | number;
    isLoading?: boolean;
  }
  
  const Transaction = ({ amount, isLoading = false }: IProps) => {

    return (
      <Box border={`1px solid ${isLoading ? 'yellow' : 'black'}`} position="relative" blur="10px" fontSize="4xl">
          {amount}
          {isLoading ? <Progress size='xs' isIndeterminate /> : null}
      </Box>
    );
  };
  
  export default Transaction;
  