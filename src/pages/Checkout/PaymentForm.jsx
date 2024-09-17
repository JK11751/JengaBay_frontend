import { useState, useEffect } from 'react';
import {
  VStack, HStack, Stack, Box, Link, Button, Divider, Text, FormControl,
  FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast
} from "@chakra-ui/react";
import { BiLockAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { FaCalendar, FaRegWindowMaximize } from "react-icons/fa";
import { Visa, Discover, Western, Mastercard, Amex, Worldpay } from "react-pay-icons";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { Icon } from "@chakra-ui/icon";
import APIServices from "../../utils/apiServices";
import { CLEAR_CART } from '../../redux/App/actionTypes';

const PaymentForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();

  const cartItems = useSelector(({ cartReducer }) => cartReducer.cartItems);
  const TotalPrice = useSelector(({ cartReducer }) => 
    cartReducer.cartItems.reduce((price, item) => price + item.quantity * item.item_price, 0)
  );

  useEffect(() => {
    setAmount(TotalPrice);
  }, [TotalPrice]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async () => {
    try {
      const data = {
        phone_number: phoneNumber,
        amount: parseInt(amount, 10),
        seller_id: 1,  
      };
  
      // Call the mpesa function from apiServices
      const response = await APIServices.mpesa(data);
      
      if (response.data && response.data.ResponseCode === '0') {  // Assuming '0' is success code
        toast({
          title: "Payment Initiated",
          description: "Your payment has been initiated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Create order after successful payment initiation
        const orderData = {
          user_id: 16,  // Replace with actual user ID
          cart_items: cartItems,  // Use actual cart items
          total_amount: parseInt(amount, 10),
        };

        const orderResponse = await APIServices.createOrder(orderData);
        console.log('Order created:', orderResponse.data);
  
        toast({
          title: "Order Created",
          description: "Your order has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear cart after successful order creation
        dispatch({ type: CLEAR_CART });
        
      } else {
        throw new Error("Payment initiation failed");
      }
      
      handleClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment Failed",
        description: error.response?.data?.error || "There was an error initiating the payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  
  return (
    <Box p={{ base: "10px", md: "20px" }}>
      <VStack mt="5px" spacing={4}>
        <HStack justify="center">
          <Text color="black" fontSize={{ base: "lg", md: "xl" }}>
            Credited Payment Methods
          </Text>
        </HStack>
        <Divider />
        <VStack spacing={4} mb="100px">
          <Button
            borderColor="#007AC"
            borderWidth="1px"
            width={{ base: "150px", md: "200px" }}
            borderStyle="solid"
            mb="5px"
            onClick={handleOpen} // Open modal on button click
          >
            Mpesa
          </Button>
          <HStack justify="center" mb="30px">
            <img
              height="40"
              alt="paypal"
              src="https://shoplineimg.com/assets/footer/card_paypal.png"
            />
          </HStack>
          <Text fontSize={{ base: "md", md: "lg" }}>Pay by Card</Text>
          <HStack spacing={4} justify="center" flexWrap="wrap">
            <Visa style={{ margin: 10, width: 80 }} />
            <Discover style={{ margin: 10, width: 80 }} />
            <Western style={{ margin: 10, width: 80 }} />
            <Mastercard style={{ margin: 10, width: 80 }} />
            <Amex style={{ margin: 10, width: 80 }} />
            <Worldpay style={{ margin: 10, width: 80 }} />
          </HStack>
        </VStack>
        <Box alignSelf="center" w="100%">
          <FormControl id="card-no" isRequired>
            <FormLabel>Card Number</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaRegWindowMaximize color="gray.300" />}
              />
              <Input
                variant="filled"
                width="100%"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          w="100%"
          align="center"
        >
          <FormControl id="expirydate" isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaCalendar color="gray.300" />}
              />
              <Input
                type="text"
                variant="filled"
                placeholder="mm/dd/yy"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="cvc" isRequired>
            <FormLabel>CVC/CVV</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiLockAlt color="gray.300" />}
              />
              <Input
                variant="filled"
                placeholder="..."
                type="text"
              />
            </InputGroup>
          </FormControl>
        </Stack>
        <HStack justify="center" mt={2}>
          <BiLockAlt color="gray.300" />
          <Text fontSize={{ base: "sm", md: "md" }}>
            Your transaction is secured with SSL encryption
          </Text>
        </HStack>
        <HStack justify="center" spacing={4}>
          <Button
            type="submit"
            padding="10px"
            background="#007ACC"
            borderRadius="25px"
            width="150px"
            height="35px"
            color="#ffffff"
          >
            Pay Now
          </Button>
          <Link href='/' color="#007ACC" fontSize={{ base: "sm", md: "md" }}>
            Continue Shopping
          </Link>
          <Icon as={BsArrowRightShort} />
        </HStack>
      </VStack>

      {/* Mpesa Modal */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mpesa Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="phone-number" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number beginning with 254"
                type="tel"
              />
            </FormControl>
            <FormControl id="amount" isRequired mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                min="0"
                isReadOnly 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentForm;
