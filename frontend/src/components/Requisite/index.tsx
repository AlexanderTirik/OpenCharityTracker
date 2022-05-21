import { Box, BoxProps } from "@chakra-ui/react";
import { formatCard } from "../../helpers/moneyHelper";
  interface IProps {
    address: string;
    label: string;
  }
  
  const Requisite = ({ address, label, ...rest }: IProps & BoxProps) => {

    return (
      <Box {...requisiteStyle} {...rest}>
          <Box fontSize="3xl" fontWeight="700">{formatCard(address)}</Box><Box {...labelStyle}>{label}</Box>
      </Box>
    );
  };

  const requisiteStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const labelStyle = {
    ml: 3,
    fontSize:"xl",
    fontWeight: "bold",
    color: "white",
    background: "#ADD8FF",
    padding: "5px 15px",
    borderRadius: "10px",
    borderBottom: "2px solid #72BBFF"
  }
  
  export default Requisite;
  