import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  usePrevious,
} from "@chakra-ui/react";
import CountUp from "react-countup";

interface IProps {
  balance: number;
  goal: number;
}

const Chart = ({ balance, goal }: IProps) => {
  const prevBalance = usePrevious(balance);

  const percent = Math.round((balance * 100) / goal);
  return (
    <Flex direction="column" align="center">
      <CircularProgress size={320} value={percent}>
        <CircularProgressLabel>{percent}%</CircularProgressLabel>
      </CircularProgress>
      <Stat>
        <StatLabel>Зібрано</StatLabel>
        <StatNumber>
          {<CountUp start={prevBalance || 0} end={balance} duration={0.5} />}/
          {goal}
        </StatNumber>
      </Stat>
    </Flex>
  );
};

export default Chart;
