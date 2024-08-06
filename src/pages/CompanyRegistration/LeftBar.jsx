import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../../assets/JengaBay.png";
import RegistrationForm from "./RegistrationForm";

const LeftBar = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} width="100%" minHeight="100vh">
      <Box
        width={{ base: "100%", md: "25%" }}
        bg="#007ACC"
        p={4}
        display="flex"
        alignItems={{base:"center", md:"flex-start"}}
        justifyContent={{base:"center", md:"flex-start"}}
      >
        <Image src={logo} alt="logo" maxWidth="100%" />
      </Box>
      <Box
        width={{ base: "100%", md: "75%" }}
        bg="#ffffff"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <RegistrationForm />
      </Box>
    </Flex>
  );
};

export default LeftBar;
