import React from "react";
import { chakra, Box, useColorModeValue, Link } from "@chakra-ui/react";
import { useHistory } from "react-router";
import seller from "../../../assets/seller2.jpg";

const RegisterAsASeller = () => {
  const history = useHistory();
  
  return (
    <Box
      mt={{ base: 4, md: 8 }}
      mx={{ base: 4, md: 8 }}
      display={{ base: "block", lg: "flex" }}
      w="full"
      maxW="1200px"
      h={{ base: "auto", lg: "40vw" }}
      shadow={{ base: "sm", lg: "lg" }}
      rounded="lg"
      overflow="hidden"
    >
      <Box
        w={{ base: "full", lg: "50%" }}
        h={{ base: "200px", lg: "full" }}
        bgImage={`url(${seller})`}
        bgSize="cover"
        bgPosition="center"
      />

      <Box
        py={{ base: 4, md: 6, lg: 8 }}
        px={{ base: 4, md: 6, lg: 8 }}
        w={{ base: "full", lg: "50%" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <chakra.h2
          fontSize={{ base: "sm", md: "xl", }}
          fontFamily={'sans-serif'}
          color={useColorModeValue("black", "black")}
          fontWeight="bold"
        >
          Register as a{" "}
          <chakra.span color={useColorModeValue("brand.600", "brand.400")}>
            Seller
          </chakra.span>
        </chakra.h2>
        <chakra.p
          mt={4}
          fontSize={{ base: "md", md: "md" }}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Do you have a specific or a variety of products that you sell? Do you have a physical store or you only have a storage room you keep them in? How many customers do you reach out to monthly? How many sales do you get from the corner of your store? It is time to go bigger and better. The next level of buying and selling is now on the internet, it is so much better and convenient for both sellers and buyers. You only have to find an appropriate channel to get your products connected to the right buyer. That is what JengaBay is an expert at. If you need a place that exposes your products to a wide range of customers from all across Kenya, you need to sign up now to be a vendor. You get the chance to show your products to customers miles away from you without spending an extra cost for advertising, delivery, customer service, or aftersales.
        </chakra.p>

        <Box mt={8} textAlign={{ base: "center", lg: "left" }}>
          <Link
            bg="#007ACC"
            color="gray.100"
            px={6}
            py={3}
            fontFamily="sans-serif"
            fontWeight="semibold"
            borderRadius="50px"
            _hover={{ bg: "gray.800" }}
            onClick={() => history.push(`/registration`)}
            display="inline-block"
          >
            Register Now
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterAsASeller;
