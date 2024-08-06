import React from "react";
import { chakra, Box, Flex, useColorModeValue, HStack, Icon, Spacer, Button, Image } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { handleAddToCart, handleRemoveFromCart } from '../../redux/appActions/cartActions';

function NumberStepper({ quantity, add, remove }) {
    return (
        <HStack>
            <Button variant="unstyled" onClick={remove}>-</Button>
            <Box 
                as="span" 
                height="30px" 
                borderRadius="5px" 
                textAlign="center" 
                borderWidth="1px" 
                borderColor="#c4c4c4" 
                width="50px"
            >
                {quantity}
            </Box>
            <Button variant="unstyled" onClick={add}>+</Button>
        </HStack>
    );
}

const CartItem = (props) => {
    const dispatch = useDispatch();

    return (
        <Flex
            mt={5}
            direction={{ base: "column", md: "row" }}
            width={{ base: "100%", md: "80%" }}
            h={{ base: "auto", md: "180px" }}
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            p={4}
        >
            <Box
                w={{ base: "full", md: "200px" }}
                h={{ base: "150px", md: "100%" }}
            >
                <Image 
                    objectFit="cover" 
                    h="100%" 
                    src={props.image} 
                    alt={props.name}
                />
            </Box>

            <Box
                w={{ base: "full", md: "2/3" }} 
                p={4}
            >
                <Flex alignItems="baseline">
                    <chakra.h1
                        fontSize={{ base: "lg", md: "2xl" }}
                        fontWeight="bold"
                        color={useColorModeValue("gray.800", "white")}
                    >
                        {props.name}
                    </chakra.h1>
                    <Spacer />
                    <Icon
                        _hover={{ cursor: "pointer" }}
                        onClick={() => dispatch(handleRemoveFromCart(props.item))}
                        as={DeleteIcon}
                    />
                </Flex>

                <Box d="flex" alignItems="baseline" mt={2}>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize={{ base: "xs", md: "sm" }}
                        textTransform="uppercase"
                        ml="2"
                    >
                        &bull; SIZE &bull; {props.unit}
                    </Box>
                </Box>

                <Flex 
                    mt={3} 
                    alignItems="center" 
                    justifyContent="space-between" 
                    direction={{ base: "column", md: "row" }}
                >
                    <chakra.h1 color="black" fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                        Ksh. {props.price}
                    </chakra.h1>
                    <NumberStepper 
                        add={() => dispatch(handleAddToCart(props.item))} 
                        remove={() => dispatch(handleRemoveFromCart(props.item))} 
                        quantity={props.quantity} 
                    />
                    <chakra.h1
                        px={2}
                        py={1}
                        bg="white"
                        fontSize={{ base: "sm", md: "xs" }}
                        color="gray.900"
                        fontWeight="bold"
                        rounded="lg"
                        textTransform="uppercase"
                        _hover={{ bg: "gray.200" }}
                        _focus={{ bg: "gray.400" }}
                    >
                        Item Total: Ksh. {props.quantity * props.price}
                    </chakra.h1>
                </Flex>
            </Box>
        </Flex>
    );
};

export default CartItem;
