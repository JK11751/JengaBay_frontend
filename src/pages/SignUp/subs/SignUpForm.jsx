import { FormControl, Input, InputGroup, InputLeftElement,Box, InputRightElement, Button, IconButton, Text, HStack, Stack, Divider, Flex, VStack, FormHelperText, Checkbox } from "@chakra-ui/react";
import { IoIosPerson } from "react-icons/io";
import { HiOutlineMail, HiPhone } from "react-icons/hi";
import { BiLockAlt, BiShowAlt, BiHide } from "react-icons/bi";
import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import facebookIcon from "../../../assets/facebook.png";
import googleIcon from "../../../assets/Google.png";
import linkedInIcon from "../../../assets/linkedin.png";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useForm } from "../../../utils/useForm";
import { handleRegisterClient } from "../../../redux/appActions/userActions";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { handleSubmit, handleChange, data: user, errors } = useForm({
        validations: {
            username: {
                pattern: {
                    value: '^[A-Za-z]*$',
                    message: "You're not allowed to use special characters or numbers in your name.",
                },
            },
            email: {
                pattern: {
                    value: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
                    message: "Please enter a valid email address"
                }
            },
            phone_number: {
                pattern: {
                    value: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$',
                    message: "Please enter a valid phone number"
                },
                custom: {
                    isValid: (value) => value.length >= 10,
                    message: 'The number needs to be at least 10 characters long.',
                },
            },
            password: {
                custom: {
                    isValid: (value) => value.length > 6,
                    message: 'The password needs to be at least 6 characters long.',
                },
            },
        },
        onSubmit: () => {
            setIsLoading(true);
            const data = {
                profile: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                },
                phone_number: user.phone_number,
            }
            dispatch(handleRegisterClient(data));
            setIsLoading(false)
            toast.success("Sign up successful", {
                position: "bottom-left",
            });
            history.push("/login");
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" width="100%">
                <Text align="center" fontSize={{ base: "2xl", md: "4xl" }} mt={5}>
                    Create an Account
                </Text>
                <HStack alignSelf="center" mt={4} mb={4}>
                    <Image src={facebookIcon} boxSize="40px" />
                    <Image src={googleIcon} boxSize="40px" />
                    <Image src={linkedInIcon} boxSize="40px" />
                </HStack>
                <Stack direction="row" alignItems="center" px={{ base: 4, md: 6 }}>
                    <Divider color="#000000" orientation="horizontal" />
                    <Text alignSelf="center" fontWeight="500" p={2}>
                        OR
                    </Text>
                    <Divider orientation="horizontal" />
                </Stack>
                <Text align="center" fontSize={{ base: "sm", md: "md" }}>
                    Sign up with your email address
                </Text>
                <VStack spacing="15px" px={{ base: 4, md: 8 }} pt={4} pb={4}>
                    <FormControl id="username" isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<IoIosPerson h={4} w={4} color="gray.300" />}
                            />
                            <Input
                                variant="filled"
                                size="md"
                                placeholder="Username"
                                type="text"
                                value={user.username || ""}
                                onChange={handleChange("username")}
                            />
                        </InputGroup>
                        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<HiOutlineMail color="gray.300" />}
                            />
                            <Input
                                variant="filled"
                                size="md"
                                placeholder="Enter Email Address"
                                type="email"
                                value={user.email || ""}
                                onChange={handleChange("email")}
                            />
                        </InputGroup>
                        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                    </FormControl>
                    <FormControl id="phone_number" isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<HiPhone color="gray.300" />}
                            />
                            <Input
                                variant="filled"
                                size="md"
                                placeholder="Enter your phone number"
                                type="text"
                                value={user.phone_number || ""}
                                onChange={handleChange("phone_number")}
                            />
                        </InputGroup>
                        {errors.phone_number && <FormHelperText>{errors.phone_number}</FormHelperText>}
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BiLockAlt color="gray.300" />}
                            />
                            <Input
                                variant="filled"
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                size="md"
                                value={user.password || ""}
                                onChange={handleChange("password")}
                            />
                            <InputRightElement width="4.5rem">
                                {show ? (
                                    <IconButton
                                        as={BiShowAlt}
                                        variant="unstyled"
                                        h={5}
                                        w={5}
                                        onClick={handleClick}
                                    />
                                ) : (
                                    <IconButton
                                        as={BiHide}
                                        h={5}
                                        w={5}
                                        variant="unstyled"
                                        onClick={handleClick}
                                    />
                                )}
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                </VStack>
                <Flex mb={4} alignContent="center" px={{ base: 4, md: 8 }}>
                    <Checkbox isRequired size="lg" colorScheme="green">
                        <Text mt={1} fontSize={{ base: "sm", md: "xs" }}>
                            By creating an account, you agree to the terms of service and
                            conditions, and Privacy Policy
                        </Text>
                    </Checkbox>
                </Flex>
                <Button
                    type="submit"
                    alignSelf="center"
                    padding="10px"
                    background="#007ACC"
                    borderRadius="50px"
                    width={{ base: "100%", md: "300px" }}
                    height="35px"
                    color="#ffffff"
                    isDisabled={!user.password || !user.email || !user.username || !user.phone_number}
                    isLoading={isLoading}
                >
                    Sign Up
                </Button>
                <Text align="center" mt={4} fontSize={{ base: "sm", md: "xs" }}>
                    Already have an account?
                    <Box as="span" textColor="#007ACC" onClick={() => history.push("/login")}>
                        {" "}
                        Log in
                    </Box>
                </Text>
            </Flex>
        </form>
    );
};

export default SignUpForm;
