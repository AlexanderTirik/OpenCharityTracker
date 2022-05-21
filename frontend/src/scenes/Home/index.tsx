import { Box, Flex, Heading } from "@chakra-ui/react";
import Chart from "../../components/Chart";
import ProjectInfo from "../../components/ProjectInfo";
import Requisite from "../../components/Requisite";
import Transaction from "../../components/Transaction";
import { useAppSelector } from "../../hooks/redux";

const Home = () => {
  // runApi();
  // const {
  //   data
  // } = useGetInfoQuery("any");

 const  data = {
    name: "Допомога для Кості Цимбала",
    description: ` Ми збираємо гроші на нові труси для Кості Цимбала, йому терміново потрібні нові, бо старі він вмудрився обісрати.
    Це дуже довга історія про те як він обісрав свої труси, але якщо коротко, він випив хуйового вина во Франціі, після чого, коли він пішов у музей, він обісрався від хуйового вина.
    Люди, не будьте байдужими, кожна гривня буде корисна, бо грошей на нові труси у Кості немає, мінімальна ціна на труси у Франціі - 100 євро, тому ми відкрили збір на 3000 гривень, що є 100 євро.`,
    amount: 1000,
    goal: 3000,
    requisites: { mono: "1488 1488 1488 1488" },
  };

  const { transactions } = useAppSelector((state) => state.project);
  return (
    <Box width="80%" margin="0 auto">
      <Flex direction="row" justify="space-around" mb="30px">
        <Flex direction="column">
          <ProjectInfo
            name={data.name}
            description={data.description}
            goal={data.goal}
            mb="30px"
            mr="5"
          />
          <Box ml="16px">
            <Heading size="md" mb={2}>Реквізити: </Heading>
            <Requisite address={data.requisites.mono} label="MONO" />
          </Box>
        </Flex>
        <Chart balance={data.amount} goal={data.goal} />
      </Flex>
      <Flex direction="column" ml="16px">
      <Heading size="md" mb={2}>Останні транзакції: </Heading>
        {transactions.map((tsn) => (
          <Transaction {...tsn} marginBottom="5px" />
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
