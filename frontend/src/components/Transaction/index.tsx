import { Box, BoxProps, Progress } from "@chakra-ui/react";

  
  interface IProps {
    amount: string | number;
    isLoading?: boolean;
  }
  
  const Transaction = ({ amount, isLoading = false, ...rest }: IProps & BoxProps) => {

    return (
      <Box {...transactionStyle} {...{borderBottom: !isLoading ? "5px solid #EEEEEE" : ''}} {...rest}>
        <Box background="white" borderRadius="8px" padding="10px" display="flex" justifyContent="space-between" alignItems="center">
            <Box fontWeight="bold" fontSize="xl">
              {amount} грн
            </Box>
            <Box color="#72BBFF" cursor="pointer">
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
  