import React from 'react';
import { chakra, Box, Flex, useColorModeValue, Button, Spacer, Avatar, Center, HStack, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { handleAddToCancelled, handleRemoveFromCancelled, handleDeleteOrder } from '../../redux/appActions/orderActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export const OrderItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast(); // Add this line

  // Delete order handler
  const handleDeleteClick = async () => {
    try {
      await dispatch(handleDeleteOrder(props.seller_id, props.id));
      toast({
        title: "Order deleted.",
        description: "The order has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: "An error occurred while deleting the order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      mt={5}
      width="100%"
      h="180px"
      bg={useColorModeValue("white", "gray.800")}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      alignItems="center"
    >
      {/* Seller Avatar */}
      <Box w={1 / 4}>
        <Center>
          <Avatar 
            borderWidth="2px" 
            size="2xl" 
            borderRadius="500px" 
            borderColor="#0095F8" 
            objectFit="cover" 
            src={props.sellerProfilePic} 
          />
        </Center>
      </Box>

      {/* Order Details */}
      <Box w={2 / 3} p={{ base: 4, md: 4 }}>
        <Flex alignItems="baseline">
          {/* Order Title */}
          <chakra.h1
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
            onClick={() => history.push(`/orders/order-details/${props.id}?seller=${props.seller_id}`)}
            _hover={{ cursor: "pointer", color: "#007acc" }}
          >
            Order #{props.order.id}
          </chakra.h1>

          <Spacer />

          {/* Action Buttons: Edit, Delete, Cancel, Undo Cancel */}
          <HStack>
            <Button _hover={{ cursor: "pointer" }} onClick={handleDeleteClick} leftIcon={<DeleteIcon />} colorScheme="red">
              Delete Order
            </Button>
            <Button _hover={{ cursor: "pointer" }} onClick={() => dispatch(handleAddToCancelled(props.order))} leftIcon={<DeleteIcon />}>
              Cancel Order
            </Button>
            <Button _hover={{ cursor: "pointer" }} onClick={() => dispatch(handleRemoveFromCancelled(props.order))} rightIcon={<DeleteIcon />}>
              Undo Cancel Order
            </Button>
          </HStack>
        </Flex>

        {/* Ordered Items */}
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" mt={1}>
          {props.order.ordered_items.length} ordered items
        </Box>

        {/* Order Description */}
        <chakra.p mt={1} fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit In odit
        </chakra.p>

        <Spacer />

        {/* Order Total Amount */}
        <Flex mt={3} alignItems="center" justifyContent="space-between">
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            KSH. {props.order.total_amount_payable}
          </chakra.h1>
        </Flex>
      </Box>
    </Flex>
  );
};
