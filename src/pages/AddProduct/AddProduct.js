import React, { useEffect } from "react";
import { Box, Flex, Avatar, Text, Image } from "@chakra-ui/react";
import UploadForm from "./UploadForm";
import logo from "../../assets/JengaBay.png";
import { useDispatch, useSelector } from 'react-redux';
import { handleGetSellerDetails } from "../../redux/appActions/sellerActions";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { SellerId } = useParams();
  const sellerDetails = useSelector((state) => state.sellerReducer.sellerDetails);

  useEffect(() => {
    dispatch(handleGetSellerDetails(SellerId));
  }, [dispatch, SellerId]);

  return (
    <Flex direction="row" minH="100vh">
      <Box width="25%" bg="#007ACC" p={4}>
        <Image src={logo} alt="logo" mb={6} />
        {sellerDetails.map((seller) => (
          <Box key={seller._id} mb={8}>
            <Avatar borderColor="#0095F8" borderWidth="5px" size="2xl" name={seller.business_name} src={seller.profile_pic} mb={2} />
            <Text color="white" fontSize="xl">{seller.business_name}</Text>
          </Box>
        ))}
      </Box>
      <Box width="85%" bg="#ffffff" p={4}>
        <UploadForm />
      </Box>
    </Flex>
  );
};

export default AddProduct;
