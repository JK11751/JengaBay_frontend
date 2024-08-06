import React from 'react';
import { Box, Divider, HStack, Text, VStack, Flex, Center } from '@chakra-ui/react';
import NavBar from '../../components/PageSections/NavBar';
import { Icon } from '@chakra-ui/icon';
import { BsArrowDown } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { handleRemoveFromCart, handleClearCart, handleUpdateQuantity } from '../../redux/appActions/cartActions';
import CartItem from './CartItem';

const style = {
    color: "#C4C4C4",
    fontSize: { base: "12px", md: "15px" },
    fontFamily: "monospace",
};

const otherStyles = {
    color: "#C4C4C4",
    fontSize: { base: "12px", md: "15px" },
    fontFamily: "monospace",
};

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(({ cartReducer }) => cartReducer);
    const history = useHistory();
    const TotalPrice = cart.cartItems.reduce((price, item) => price + item.quantity * item.item_price, 0);
    
    return (
        <Box maxH="100vh" p={{ base: 4, md: 10 }}>
            <NavBar />
            <Flex direction={{ base: "column", lg: "row" }} height="auto" spacing={4}>
                <Box 
                    p={4}
                    width={{ base: "100%", lg: "65%" }}
                    position="relative"
                >
                    <Box
                        p={2}
                        as="button"
                        variant="link"
                        alignSelf="flex-start"
                        fontFamily="sans-serif"
                        fontSize={{ base: "14px", md: "15px" }}
                        color="#555"
                        mb={3}
                        onClick={() => history.push(`/`)}
                    >
                        <Icon as={IoIosArrowBack} /> Continue Shopping
                    </Box>
                    <Divider mb={4} borderColor="gray.400" />
                    <VStack mt={5} mb={10} alignItems="flex-start">
                        <Text fontSize={{ base: "20px", md: "30px" }} fontFamily="sans-serif">Shopping Cart</Text>
                        <HStack spacing={{ base: "4", md: "8" }}>
                            <Text>You have {cart.cartItems.length} item{cart.cartItems.length > 1 ? 's' : ''} in your cart</Text>
                            <Text>Sort by: price <Icon as={BsArrowDown} /></Text>
                        </HStack>
                    </VStack>
                    <Box width="100%">
                        {cart.cartItems.length === 0 ? (
                            <Text>There are no items in the cart</Text>
                        ) : (
                            cart.cartItems.map((item) => (
                                <CartItem 
                                    key={item.item_id}
                                    name={item.item_name}
                                    unit={item.item_measurement_unit}
                                    image={item.item_main_image}
                                    price={item.item_price}
                                    quantity={item.quantity}
                                    item={item}
                                    handleUpdateQuantity={handleUpdateQuantity}
                                    handleRemoveProduct={handleRemoveFromCart}
                                />
                            ))
                        )}
                    </Box>    
                    {cart.cartItems.length !== 0 && (
                        <Box mt={5}>
                            <Text>Add a note</Text>
                            <Input mt={2} height="37px" borderRadius="50px" width="100%" maxWidth="300px" size="sm" placeholder="Add a note" />
                            <Button mt={3} onClick={() => dispatch(handleClearCart())} size="md" fontWeight="normal" fontFamily="sans-serif" color="white" bg="#555" borderRadius="50px" width="100%" maxWidth="300px">
                                Clear Cart
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box 
                    height="auto" 
                    width={{ base: "100%", lg: "35%" }} 
                    bg="#E9F6FF" 
                    p={{ base: 4, md: 5 }}
                    position="relative"
                >
                    <Box
                        w="full"
                        mx="auto"
                        mt={10}
                        bg={useColorModeValue("white", "gray.800")}
                        shadow="lg"
                        rounded="lg"
                        p={5}
                        overflow="hidden"
                    >
                        <Center>
                            <VStack spacing={4}>
                                <Text fontWeight="bold" fontFamily="sans-serif">ORDER SUMMARY</Text>
                                <Divider width="full" mb={4} borderWidth="2px" borderColor="black" />
                                <Text {...otherStyles}>ITEMS IN CART: {cart.cartItems.length}</Text>
                                <Text {...otherStyles}>ESTIMATED DELIVERY FEE: KSH.0</Text>
                                <Text {...otherStyles}>DISCOUNT</Text>
                                <Text {...otherStyles}>TOTAL CART AMOUNT: {TotalPrice}</Text>
                                <Button onClick={() => history.push("/checkout")} size="md" fontWeight="normal" fontFamily="sans-serif" color="white" bg="#555" borderRadius="50px" width="full">
                                    CHECKOUT NOW
                                </Button>
                            </VStack>
                        </Center>
                    </Box>
                    <VStack spacing="30px" mt={5}>
                        <Text mb={5} {...style}>Shipping and taxes calculated at checkout</Text>
                        <HStack>
                            <input type="checkbox" />
                            <Text mb={5} {...style}>I agree to Terms & Conditions</Text>
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};
