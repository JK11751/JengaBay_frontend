/* eslint-disable no-unused-vars */
// components/Sidebar.js
import React from "react";
import {
  Box,
  VStack,
  Link,
  Text,
  IconButton,
  Collapse,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  HomeIcon,
  AddIcon,
  StarIcon,
  ShoppingCartIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiUsers,
  FiPlus,
  FiList,
  FiInfo,
} from "react-icons/fi";

const Dashboard = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <Box
      w={isCollapsed ? "60px" : "250px"}
      bg="#007ACC"
      textColor="white"
      h="100vh"
      p="4"
      position="fixed"
      transition="width 0.2s"
      zIndex="overlay"
    >
      <Flex justify="space-between" align="center">
        {!isCollapsed && (
          <Text fontSize="xl" mb="4">
            Dashboard
          </Text>
        )}
        <IconButton
          aria-label="Toggle Sidebar"
          variant='outline'
          icon={isCollapsed ? <HamburgerIcon  /> : <CloseIcon  />}
          onClick={onToggleCollapse}
          mr={4}
          mb="4"
        />
      </Flex>
      <VStack align="start">
        <Link
          as={RouterLink}
          to="/"
          _hover={{ textDecoration: "none", bg: "gray.700" }}
          p="2"
          w="full"
        >
          <Flex align="center">
            <Box color={"white"} as={FiHome} mr={isCollapsed ? "0" : "4"} />
            {!isCollapsed && "Home"}
          </Flex>
        </Link>
        <Link
          as={RouterLink}
          to="/products"
          _hover={{ textDecoration: "none", bg: "gray.700" }}
          p="2"
          w="full"
        >
          <Flex align="center">
            <Box color={"white"} as={FiList} mr={isCollapsed ? "0" : "4"} />
            {!isCollapsed && "Products"}
          </Flex>
        </Link>
        <Link
          as={RouterLink}
          to="/sellers"
          _hover={{ textDecoration: "none", bg: "gray.700" }}
          p="2"
          w="full"
        >
          <Flex align="center">
            <Box color={"white"} as={FiUsers} mr={isCollapsed ? "0" : "4"} />
            {!isCollapsed && "Sellers"}
          </Flex>
        </Link>
        <Link
          as={RouterLink}
          to="/upload"
          _hover={{ textDecoration: "none", bg: "gray.700" }}
          p="2"
          w="full"
        >
          <Flex align="center">
            <Box color={"white"} as={FiPlus} mr={isCollapsed ? "0" : "4"} />
            {!isCollapsed && "Add Product"}
          </Flex>
        </Link>
        <Link
          as={RouterLink}
          to="/orders"
          _hover={{ textDecoration: "none", bg: "gray.700" }}
          p="2"
          w="full"
        >
          <Flex align="center">
            <Box color={"white"} as={FiPackage} mr={isCollapsed ? "0" : "4"} />
            {!isCollapsed && "Orders"}
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
};

export default Dashboard;
