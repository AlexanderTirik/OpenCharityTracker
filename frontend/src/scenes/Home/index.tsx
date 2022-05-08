import { Flex } from "@chakra-ui/react";
import Chart from "../../components/Chart";
import ProjectInfo from "../../components/ProjectInfo";
import Transaction from "../../components/Transaction";
import { useAppSelector } from "../../hooks/redux";
import { runApi } from "../../mockApi";
import { useGetInfoQuery } from "../../services/api";

const Home = () => {
  runApi();
  const {
    data: { name, description, amount, goal, requisites }
  } = useGetInfoQuery("any");
  const { transactions } = useAppSelector((state) => state.project);
  return (
    <div>
      <Flex direction="row" justify="space-around">
        <ProjectInfo
          name={name}
          description={description}
          requisites={requisites}
          goal={goal}
        />
        <Chart balance={amount} goal={goal} />
      </Flex>
      <Flex>
        {transactions.map((tsn) => (
          <Transaction {...tsn} />
        ))}
      </Flex>
    </div>
  );
};

export default Home;
