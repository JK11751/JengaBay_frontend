import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import PaymentForm from './PaymentForm';

const CheckoutPage = () => {
  return (
      <Flex width="100vw" boxShadow="sm">
      <Box height="100vh" width="100%" bg="#ffffff" borderRadius="5px">
          <PaymentForm />
        </Box>
      </Flex>
   
  );
}

export default CheckoutPage;
