import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Flex, Box, HStack, VStack } from "@chakra-ui/react";
import {
  Avatar,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { handleRegisterSeller } from "../../redux/appActions/userActions";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {
  const history = useHistory();
  const [street, setStreet] = useState("");
  const [password, setPassword] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [regdoc, setRegdoc] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [county, setCounty] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [phone, setPhone] = useState("");
  const [countycode, setCountycode] = useState("");
  const [localAreaName, setLocalAreaName] = useState("");
  const [building, setBuilding] = useState("");
  const [town, setTown] = useState("");
  const [businessname, setBusinessname] = useState("");
  const dispatch = useDispatch();

  const data = {
    sub_county: {
      county: {
        county_name: county,
        code: countycode,
      },
      subcounty_name: subcounty,
    },
    profile: {
      username: email,
      password: password,
      email: email,
    },
    business_name: businessname,
    business_reg_no: regno,
    phone_number: phone,
    town: town,
    local_area_name: localAreaName,
    street: street,
    building: building,
    business_reg_doc: regdoc?.name,
    profile_pic: profile_pic?.name,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleRegisterSeller(data));
    history.push("/");
  };

  return (
    <Flex
      flexDirection="column"
      pt={{ base: 4, md: 4 }}
      
      mx="auto"
    >
      <Box>
        <VStack spacing={4}>
          <Text fontSize="30px" textColor="normal">
            Company Registration
          </Text>
        </VStack>
        <HStack
          spacing={4}
          mb={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Avatar size="md" />
          <FormControl id="input-file" isRequired>
            <FormLabel>Company Logo</FormLabel>
            <input
              type="file"
              onChange={(e) => setProfile_pic(e.target.files[0])}
            />
          </FormControl>

          <FormControl id="input-file" isRequired>
            <FormLabel>Registration Certificate</FormLabel>
            <input type="file" onChange={(e) => setRegdoc(e.target.files[0])} />
          </FormControl>

          <FormControl id="business-name" isRequired>
            <FormLabel>Business Name</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setBusinessname(e.target.value)}
            />
          </FormControl>
        </HStack>
        <HStack
          spacing={4}
          mb={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <FormControl id="business-registration" isRequired>
            <FormLabel>Business Registration Number</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setRegno(e.target.value)}
            />
          </FormControl>
          <FormControl id="businee-email" isRequired>
            <FormLabel>Business Email Address</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="phone-number" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
        </HStack>
        <HStack
          spacing={4}
          mb={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <FormControl id="county" isRequired>
            <FormLabel>County</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setCounty(e.target.value)}
            />
          </FormControl>
          <FormControl id="county-code" isRequired>
            <FormLabel>County-Code</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setCountycode(e.target.value)}
            />
          </FormControl>
          <FormControl id="subcounty" isRequired>
            <FormLabel>Sub County</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setSubcounty(e.target.value)}
            />
          </FormControl>
        </HStack>
        <HStack
          spacing={4}
          mb={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <FormControl id="local-area" isRequired>
            <FormLabel>Local Area Name</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setLocalAreaName(e.target.value)}
            />
          </FormControl>
          <FormControl id="street" isRequired>
            <FormLabel>Street Name</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormControl>
          <FormControl id="town" isRequired>
            <FormLabel>Town</FormLabel>
            <Input variant="filled" onChange={(e) => setTown(e.target.value)} />
          </FormControl>
        </HStack>
        <HStack
          spacing={4}
          mb={4}
          flexDirection={{ base: "column", md: "row" }}
        >
          <FormControl id="building" isRequired>
            <FormLabel>Building</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setBuilding(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="c-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input variant="filled" />
          </FormControl>
        </HStack>
        <Flex
          mb={4}
          direction={{ base: "column", md: "row" }}
          alignItems="center"
        >
          <Text>
            Note that the fields marked with * are required to process your
            registration request
          </Text>
        </Flex>
        <HStack
          spacing={4}
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button
            mb={{ base: 4, md: 0 }}
            padding="10px"
            background="#fffffC"
            borderRadius="50px"
            borderWidth="1px"
            borderColor="#007ACC"
            borderStyle="solid"
            width="200px"
            height="40px"
            color="#007ACC"
            onClick={() => history.push("/")}
          >
            Cancel
          </Button>
          <Button
            padding="10px"
            background="#007ACC"
            width="200px"
            height="40px"
            borderRadius="50px"
            borderWidth="1px"
            borderColor="#007ACC"
            borderStyle="solid"
            color="#ffffff"
            onClick={onSubmit}
          >
            Register
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default RegistrationForm;
