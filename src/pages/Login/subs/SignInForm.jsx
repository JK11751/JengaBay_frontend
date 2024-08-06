import { useState } from "react";
import {
  VStack,
  Text,
  HStack,
  Stack,
  Divider,
  Flex,
  Spacer,
  Box,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  IconButton,
  FormControl,
  Image
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosPerson } from "react-icons/io";
import { BiLockAlt, BiShowAlt, BiHide } from "react-icons/bi";
import facebookIcon from "../../../assets/facebook.png";
import googleIcon from "../../../assets/Google.png";
import linkedInIcon from "../../../assets/linkedin.png";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../../utils/useForm";
import { handleLoginUser } from "../../../redux/appActions/authActions";
import { getToken, getUser } from "../../../utils/useToken";

const SignInForm = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm({
    validations: {
      email: {
        pattern: {
          value: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
          message: "Please enter a valid email address",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
    },
    onSubmit: () => {
      const data = {
        username: user.username,
        email: user.email,
        password: user.password,
      };

      dispatch(handleLoginUser(data));
      localStorage.setItem("newUserEmail", JSON.stringify(user.email));
      try {
        const token = getToken();
        if (token) {
          toast.success("Login successful", { position: "bottom-left" });
          const userInfo = getUser();
          const { session_status, account_id } = userInfo;
          const seller_id = account_id;

          history.push(
            session_status === "seller" ? `/sellers/${seller_id}/profile` : "/"
          );
        }
      } catch (error) {
        toast.error("Login Failed.", { position: "bottom-left" });
      }
    },
  });

  return (
    <Flex direction="column" p={{ base: 4, md: 6 }} width="100%">
      <Text align="center" fontSize={{ base: "3xl", md: "4xl" }} mt={10}>
        Sign In to Your Account
      </Text>
      <HStack alignSelf="center" mt={3} mb={3}>
        <Image src={facebookIcon} boxSize={{ base: "30px", md: "40px" }} />
        <Image src={googleIcon} boxSize={{ base: "30px", md: "40px" }} />
        <Image src={linkedInIcon} boxSize={{ base: "30px", md: "40px" }} />
      </HStack>
      <Stack direction="row" alignItems="center" pr={4} pl={4}>
        <Divider color="#000000" orientation="horizontal" />
        <Text alignSelf="center" fontWeight="500" p={2}>
          OR
        </Text>
        <Divider orientation="horizontal" />
      </Stack>
      <Text align="center" fontSize="md">
        Sign in with your email address
      </Text>
      <VStack spacing="15px" pt={4} pb={4} width="100%">
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
          {errors.username && (
            <FormHelperText color="red">{errors.username}</FormHelperText>
          )}
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
          {errors.email && (
            <FormHelperText color="red">{errors.email}</FormHelperText>
          )}
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
              <IconButton
                as={show ? BiShowAlt : BiHide}
                variant="unstyled"
                h={5}
                w={5}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
            {errors.password && (
              <FormHelperText color="red">{errors.password}</FormHelperText>
            )}
          </InputGroup>
        </FormControl>
      </VStack>
      <Flex mb={4} alignContent="center" px={{ base: 4, md: 20 }}>
        <Spacer />
        <Button
          onClick={() => history.push("/forgot-password")}
          variant="link"
          color="black"
          fontSize={{ base: "sm", md: "xs" }}
        >
          Forgot Password?
        </Button>
      </Flex>
      <Button
        alignSelf="center"
        padding="10px"
        background="#007ACC"
        borderRadius="50px"
        width={{ base: "80%", md: "300px" }}
        height="35px"
        color="#ffffff"
        isDisabled={!user.password || !user.email || !user.username}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
      <Text align="center" mt={4} fontSize={{ base: "sm", md: "xs" }}>
        Don't have an account?
        <Link to="/signup">
          <Box as="span" textColor="#007ACC"> Sign up </Box>
        </Link>
      </Text>
    </Flex>
  );
};

export default SignInForm;
