/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/JengaBay.png";
import { Box, HStack, VStack, Flex, Text } from "@chakra-ui/layout";
import { Slide } from "@chakra-ui/transition";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/image";
import { BiMenu } from "react-icons/bi";
import { Icon } from "@chakra-ui/icon";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import CategoryList from "../../data/CategoryList";
import { useHistory } from "react-router";
import { LogoutDialogue } from "../LogoutDialogue";
import { useDisclosure } from "@chakra-ui/hooks";

const LinkItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Trending", icon: FiTrendingUp, url: "/trending" },
  { name: "Explore", icon: FiCompass, url: "/explore" },
  { name: "Favourites", icon: FiStar, url: "/favourites" },
  { name: "Settings", icon: FiSettings, url: "/seller/1/profile" },
];

const SidebarContent = ({ onClose, handleToggle, ref, onOpen, ...rest }) => {
  const history = useHistory();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      overflowY="scroll"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack spacing="10px">
          <Icon
            onClick={() => handleToggle(false)}
            color="#000"
            as={BiMenu}
            h={7}
            w={7}
            alignSelf="flex-start"
          />
          <Flex flexShrink={0}>
            <Link to="/">
              <Image src={logo} />
            </Link>
          </Flex>
        </HStack>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem borderRadius="lg" borderColor="white">
          <h2>
            <AccordionButton
              _hover={{ bg: "cyan.400", color: "white", borderRadius: "lg" }}
              mx="4"
              p={4}
              _expanded={{ bg: "cyan.400", color: "white", borderRadius: "lg" }}
              _focus={{ borderRadius: "none" }}
            >
              <Icon mr={4} as={BiCategory} />
              <Box textAlign="left">Categories</Box>
              <AccordionIcon ml={3} />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {CategoryList.map((category) => (
              <Text
                fontSize="1em"
                p={2}
                _hover={{ cursor: "pointer" }}
                onClick={() => history.push(`/categories/${category.value}`)}
                key={category.id}
              >
                {category.name}
              </Text>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => history.push(link.url)}
        >
          {link.name}
        </NavItem>
      ))}
      <NavItem onClick={() => history.push("/registration")} icon={FiLogOut}>
        Register as a seller
      </NavItem>
      <NavItem onClick={() => onOpen()} icon={FiLogOut}>
        LogOut
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const SideBar = ({ show, handleToggle }) => {
  // Handles closing of the sidebar when someone clicks outside
  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        handleToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleToggle]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Slide
        direction="left"
        in={show}
        ref={boxRef}
        style={{
          height: "100vh",
          width: "20vw",
          zIndex: 10000,
        }}
      >
        <SidebarContent onOpen={onOpen} handleToggle={handleToggle} />
      </Slide>
      <LogoutDialogue isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SideBar;
