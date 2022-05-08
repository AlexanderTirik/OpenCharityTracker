import { Badge, Box, Heading } from "@chakra-ui/react";
import { IRequisites } from "../../models/IRequisites";

interface IProps {
  name: string;
  requisites: IRequisites;
  description: string;
  goal: number | string;
}

const ProjectInfo = ({ name, requisites, description, goal }: IProps) => {
  return (
    <Box {...projectInfoStyle}>
        <Heading size="xl" mb="2">{name}</Heading>
        <Box {...dataBlockStyle}>
        <Heading size="md">Реквізити</Heading>
        <Box><Badge colorScheme="blackAlpha">Mono</Badge>: {requisites.mono}</Box>
        </Box>
        <Box {...dataBlockStyle}>
        <Heading size="md">Ціль</Heading>
        <Box>{goal} гривень</Box>
        </Box>
        <Box {...dataBlockStyle}>
        <Heading size="md">
            Деталі
        </Heading>
        <Box>
           {description}
            </Box></Box>
    </Box>
  );
};

const dataBlockStyle = {
  mb: 2
}

const projectInfoStyle = {
    padding: '16px',
    border: '1px solid black',
    borderRadius: '16px'
}

export default ProjectInfo;
