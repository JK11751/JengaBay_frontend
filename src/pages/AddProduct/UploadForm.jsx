import React, { useState } from "react";
import { Textarea, Input, Button, FormControl, FormLabel, Select, Text, Box, HStack, VStack, Flex } from "@chakra-ui/react";
import Categories from "../../data/CategoryList";
import { useDispatch } from 'react-redux';
import { handleAddProductSeller } from "../../redux/appActions/productActions";
import { useHistory, useParams } from "react-router-dom";

const UploadForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { SellerId } = useParams(); // Destructure SellerId

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("metal and steel work");
  const [description, setDescription] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState(null);
  const [unit, setUnit] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const data = {
    "item_name": itemName,
    "item_description": description,
    "item_price": pricePerUnit,
    "item_measurement_unit": unit,
    "item_main_image": mainImage,
    "item_extra_image1": image1,
    "item_extra_image2": image2,
    "item_extra_image3": image3,
    "item_extra_image4": image4,
    "category": category
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    let form_data = new FormData();
form_data.append("item_name", itemName);
form_data.append("item_description", description);
form_data.append("item_price", pricePerUnit);
form_data.append("item_measurement_unit", unit);
if (mainImage) form_data.append("item_main_image", mainImage, mainImage.name);
if (image1) form_data.append("item_extra_image1", image1, image1.name);
if (image2) form_data.append("item_extra_image2", image2, image2.name);
if (image3) form_data.append("item_extra_image3", image3, image3.name);
if (image4) form_data.append("item_extra_image4", image4, image4.name);
form_data.append("category", category);


    dispatch(handleAddProductSeller(SellerId, form_data));
    history.push("/");
  };

  const handleCancel = () => {
    history.push(`/seller/${SellerId}/profile`);
  };

  return (
    <Flex direction="column" p={{ base: 4, md: 8 }} maxW="container.md" mx="auto">
      <Text fontSize={{ base: "xl", md: "2xl" }} mb={6} textAlign="center">Add Product</Text>
      <VStack spacing={6} align="stretch">
        <FormControl id="product-Name" isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input onChange={e => setItemName(e.target.value)} variant="filled" />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <Select onChange={e => setCategory(e.target.value)}>
            {Categories.map((category) => (
              <option key={category.value} value={category.value}>{category.value}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="product-description" isRequired>
          <FormLabel>Product Description</FormLabel>
          <Textarea onChange={e => setDescription(e.target.value)} variant="filled" height="220px" />
        </FormControl>
        <HStack spacing={4}>
          <FormControl id="price" isRequired>
            <FormLabel>Price per Unit</FormLabel>
            <Input onChange={e => setPricePerUnit(e.target.value)} variant="filled" />
          </FormControl>
          <FormControl id="unit" isRequired>
            <FormLabel>Unit</FormLabel>
            <Input onChange={e => setUnit(e.target.value)} variant="filled" />
          </FormControl>
        </HStack>
        <Box fontSize={{ base: "lg", md: "xl" }} mt={6}>Product Images</Box>
        <Text fontSize={{ base: "sm", md: "md" }} mb={4}>You may upload up to 5 photos. Please upload good quality photos</Text>
        <FormControl id="mainImage" isRequired>
          <FormLabel>Main Image</FormLabel>
          <Input type="file" accept="image/png, image/jpeg" onChange={e => setMainImage(e.target.files[0])} />
        </FormControl>
        <HStack spacing={4}>
          <FormControl id="image1">
            <FormLabel>Extra Image 1</FormLabel>
            <Input type="file" accept="image/png, image/jpeg" onChange={e => setImage1(e.target.files[0])} />
          </FormControl>
          <FormControl id="image2">
            <FormLabel>Extra Image 2</FormLabel>
            <Input type="file" accept="image/png, image/jpeg" onChange={e => setImage2(e.target.files[0])} />
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl id="image3">
            <FormLabel>Extra Image 3</FormLabel>
            <Input type="file" accept="image/png, image/jpeg" onChange={e => setImage3(e.target.files[0])} />
          </FormControl>
          <FormControl id="image4">
            <FormLabel>Extra Image 4</FormLabel>
            <Input type="file" accept="image/png, image/jpeg" onChange={e => setImage4(e.target.files[0])} />
          </FormControl>
        </HStack>
        <HStack spacing={4} justify="center" mt={8}>
          <Button
            padding="10px"
            bg="#fffffC"
            borderRadius="50px"
            borderWidth="1px"
            borderColor="#007ACC"
            borderStyle="solid"
            color="#007ACC"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            padding="10px"
            bg="#007ACC"
            borderRadius="50px"
            borderWidth="1px"
            borderColor="#007ACC"
            color="#ffffff"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default UploadForm;
