import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import React from "react";
import { Button } from "@chakra-ui/button";
import logo from "../../../assets/JengaBay.png";
import shopping from "../../../assets/shopping.gif";
import SignInForm from "./SignInForm";
import { useHistory } from "react-router";

const SignInContainer = (props) => {
  const history = useHistory();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      minHeight="100vh"
      width={{ base: "100%", md: "70vw" }}
      overflow="hidden"
    >
      <VStack
        background="#007ACC"
        spacing={4}
        align="center"
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          mt={10}
          src={logo}
          _hover={{ cursor: "pointer" }}
          onClick={() => history.push("/")}
          alt="logo"
        />
        <Image
          h={{ base: "200px", md: "300px" }}
          src={shopping}
          alt="shopping"
        />
        <Text color="#ffffff" fontSize={{ base: "xl", md: "2xl" }}>
          Welcome Back!
        </Text>
        <Button
          variant="link"
          _hover={{ cursor: "pointer" }}
          onClick={() => history.push("/registration")}
          fontWeight="bold"
          color="#0BC5EA"
          fontSize={{ base: "sm", md: "xs" }}
        >
          Register as a seller instead?
        </Button>
      </VStack>
      <Box
       
        bg="#ffffff"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SignInForm location={props.location} {...props} />
      </Box>
    </Flex>
  );
};

export default SignInContainer;
