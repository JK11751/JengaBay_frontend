import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import SignUpForm from "./SignUpForm";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import logo from "../../../assets/JengaBay.png";
import shopping from "../../../assets/shopping.gif";
import { useHistory } from 'react-router-dom';

const SignUpContainer = () => {
    const history = useHistory();
    return (
        <Box>
            <Flex
                direction={{ base: "column", md: "row" }}
                width="100%"
                height="100%"
                
                p={{ base: 4, md: 0 }}
                spacing={0}
            >
                <Box
                   
                    height={{ base: "auto", md: "100vh" }}
                    width={{ base: "100%", md: "40%" }}
                    background="#007ACC"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={{ base: 4, md: 2 }}
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
                    <Text color="#ffffff" fontSize={{ base: "xl", md: "2xl" }} mt={4}>
                        Hello There!
                    </Text>
                    <Button
                        variant="link"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => history.push("/registration")}
                        fontWeight="bold"
                        color="#0BC5EA"
                        fontSize={{ base: 'sm', md: 'xs' }}
                        mt={2}
                    >
                        Register as a seller instead?
                    </Button>
                </Box>
                <Box
                    height={{ base: "auto", md: "100vh" }}
                    width={{ base: "100%", md: "60%" }}
                    bg="#ffffff"
                    p={{ base: 4, md: 6 }}
                >
                    <SignUpForm />
                </Box>
            </Flex>
        </Box>
    );
};

export default SignUpContainer;
