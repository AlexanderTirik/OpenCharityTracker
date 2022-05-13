import { Flex } from "@chakra-ui/react";
import Chart from "../../components/Chart";
import ProjectInfo from "../../components/ProjectInfo";
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
    <div>
      <Flex direction="row" justify="space-around">
        <ProjectInfo
          name={data.name}
          description={data.description}
          requisites={data.requisites}
          goal={data.goal}
        />
        <Chart balance={data.amount} goal={data.goal} />
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
