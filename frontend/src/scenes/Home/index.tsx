import { Box, CircularProgress, Flex, Heading } from "@chakra-ui/react";
import Chart from "../../components/Chart";
import ProjectInfo from "../../components/ProjectInfo";
import Requisite from "../../components/Requisite";
import Transaction from "../../components/Transaction";
import { useAppSelector } from "../../hooks/redux";
import { useGetInfoQuery } from "../../services/api";
import { selectProject } from "../../slices/projectSlice";

const Home = () => {
  const {
    isError, isLoading
  } = useGetInfoQuery('f3e4c107-225e-42f6-a20c-8db51c1213ae');
  
  const { transactions, name, description, goal, amount, requisites } = useAppSelector(selectProject);

  if (isError) return <div>An error has occurred!</div>
  if (isLoading) return (
    <Flex justifyContent="center" alignItems="center" mt={5}>
      <CircularProgress size={320} isIndeterminate color="#72BBFF" />
    </Flex>
  )

  return (
    <Box width="80%" margin="0 auto">
      <Flex direction="row" justify="space-around" mb="30px">
        <Flex direction="column">
          <ProjectInfo
            name={name}
            description={description}
            goal={goal}
            mb="30px"
            mr="5"
          />
          <Box ml="16px">
            <Heading size="md" mb={2}>Реквізити: </Heading>
            <Requisite address={requisites.mono} label="MONO" />
          </Box>
        </Flex>
        <Chart balance={amount} goal={goal} />
      </Flex>
      <Flex direction="column" ml="16px">
      <Heading size="md" mb={2}>Останні транзакції: </Heading>
        {(transactions || []).map((tsn: any) => (
          <Transaction {...tsn} marginBottom="5px" />
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
