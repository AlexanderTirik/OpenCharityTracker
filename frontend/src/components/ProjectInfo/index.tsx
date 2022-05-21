import { Box, BoxProps, Heading } from "@chakra-ui/react";
import { separateByThousands } from "../../helpers/moneyHelper";

interface IProps {
  name: string;
  description: string;
  goal: number | string;
}

const ProjectInfo = ({ name, description, goal, ...rest }: IProps & BoxProps) => {
  return (
    <Box {...projectInfoStyle} {...rest}>
      <Box background="white" padding="28px" borderRadius="16px" height="100%">
        <Heading size="lg" mb="3">{name}</Heading>
        <Box fontSize="lg" mb="3"><b>Ціль:</b> {separateByThousands(goal)} гривень</Box>
        <Box fontSize="lg">
            <b>Опис: </b>
            <br />
            {description}
        </Box>
      </Box>
    </Box>
  );
};

const projectInfoStyle = {
    background: '#EEEEEE',
    border: '5px solid #EEEEEE',
    borderBottom: '33px solid #EEEEEE',
    borderRadius: '16px'
}

export default ProjectInfo;
