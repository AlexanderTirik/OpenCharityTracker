import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  usePrevious,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { separateByThousands } from "../../helpers/moneyHelper";

interface IProps {
  balance: number;
  goal: number;
}

const Chart = ({ balance, goal }: IProps) => {
  const prevBalance = usePrevious(balance);

  const percent = Math.round((balance * 100) / goal);
  return (
    <Flex direction="column" align="center">
      <CircularProgress size={320} value={percent} color="#72BBFF">
        <CircularProgressLabel><Box fontWeight="bold">{percent}%</Box><Box fontSize="lg" fontWeight="bold">{<CountUp separator=" " start={prevBalance || 0} end={balance} duration={0.5} />} / {separateByThousands(goal)}</Box></CircularProgressLabel>
        
      </CircularProgress>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box> Залишилось зібрати </Box>
        <Box fontSize="xl" fontWeight="bold">
          <CountUp start={goal} end={goal - (prevBalance || balance)} duration={0.5} separator=" " /> грн
        </Box>
      </Flex>
    </Flex>
  );
};

export default Chart;
