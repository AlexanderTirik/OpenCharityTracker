import { Box, BoxProps, Progress } from "@chakra-ui/react";

  
  interface IProps {
    amount: string | number;
    isLoading?: boolean;
    id: string;
  }
  
  const Transaction = ({ amount, id, isLoading = false, ...rest }: IProps & BoxProps) => {

    return (
      <Box {...transactionStyle} {...{borderBottom: !isLoading ? "5px solid #EEEEEE" : ''}} {...rest}>
        <Box background="white" borderRadius="8px" padding="10px" display="flex" justifyContent="space-between" alignItems="center">
            <Box fontWeight="bold" fontSize="xl">
              {amount} грн
            </Box>
            <Box as="a" href={`https://solscan.io/tx/${id}`} color="#72BBFF" cursor="pointer">
            Переглянути транзакцію
            </Box>
          </Box>
          {isLoading ? <Progress size='xs' colorScheme='blackAlpha' isIndeterminate borderRadius="16px"/> : null}
      </Box>
    );
  };
  
  const transactionStyle = {
    border: '2px solid #EEEEEE',
    padding: '1px',
    background: '#EEEEEE',
    borderRadius: "8px"
  }

  export default Transaction;
  