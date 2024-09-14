import React, { useEffect, useState } from 'react';
import NavBar from '../../components/PageSections/NavBar';
import Footer from "../../components/PageSections/Footer";
import ProductCard from '../../components/Products/ProductCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Box, Center, Flex, HStack, Text, Button, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { handleGetItemsInCategory } from "../../redux/appActions/productActions";
import { handleGetAllSellers } from "../../redux/appActions/sellerActions";
import { Link } from 'react-router-dom';
import { CategoryFilters } from '../../components/Categories/CategoryFilters';
import { Divider } from '@chakra-ui/react';
import CategoryList from '../../data/CategoryList';

export const CategoryPage = () => {
    const sellerReducer = useSelector(({ sellerReducer }) => sellerReducer);
    const itemList = useSelector((state) => state.productReducer).itemsInCategory;
    const [itemsInCategoryList, setItemsInCategoryList] = useState([]);

    const { categoryName } = useParams();
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(handleGetItemsInCategory(categoryName));
    }, [categoryName, dispatch]);
    
    useEffect(() => {
        setItemsInCategoryList(itemList);
    }, [itemList]);

    useEffect(() => { 
        dispatch(handleGetAllSellers());
    }, [dispatch]);

    // Responsive width and text sizes
    const containerWidth = useBreakpointValue({ base: '90vw', md: '80vw', lg: '65vw' });
    const breadcrumbSize = useBreakpointValue({ base: 'md', md: 'lg' });
    const cardSpacing = useBreakpointValue({ base: '15px', md: '20px' });

    return (
        <Box>
            <NavBar />
            <Breadcrumb mt="30px" fontSize={breadcrumbSize} fontFamily="monospace" textTransform="uppercase" ml={4} spacing="8px" separator={<MdKeyboardArrowRight color="gray.500" />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{categoryName}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Center>
                <Box mt={5} mb={5} textAlign="center" w="90%" bg="#E9F6FF" p={4} as="span" textTransform="uppercase" fontSize="lg">{categoryName}</Box>
            </Center>
            <Center>
                <HStack spacing={cardSpacing} mt={2} alignItems="flex-start" flexDir={{ base: 'column', md: 'row' }} w="full" p={4}>
                    <CategoryFilters sellerReducer={sellerReducer} categoryName={categoryName} CategoryList={CategoryList} />
                    <Flex p={4} height="auto" bg="#F5F5F5" borderRadius="10px" width={containerWidth} flexWrap="wrap" direction="column">
                        <Flex p={2} w="full" justify="space-between" align="center">
                            <Text p={2} fontWeight="bold">{categoryName}</Text>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    Sort by: Popularity
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>A-Z</MenuItem>
                                    <MenuItem>Z-A</MenuItem>
                                    <MenuItem>Price: High To Low</MenuItem>
                                    <MenuItem>Product Rating</MenuItem>
                                    <MenuItem>Price: Low To High</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        <Divider width="full" />
                        <Text p={4} fontWeight="bold">{itemsInCategoryList.length} items found</Text>
                        <Divider width="full" mb={2} />
                        <Flex flexWrap="wrap" gap={cardSpacing}>
                            {itemsInCategoryList.length > 0 ? (
                                itemsInCategoryList.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        price={product.item_price}
                                        sellerId={product.item_seller.id}
                                        product={product}
                                        id={product.id}
                                        company_image={product.item_seller.profile_pic}
                                        photo={product.item_main_image}
                                        category={product.category}
                                        name={product.item_name}
                                        description={product.item_description}
                                        companyName={product.item_seller.business_name}
                                    />
                                ))
                            ) : (
                                <Text p={20}>There are no products here</Text>
                            )}
                        </Flex>
                    </Flex>
                </HStack>
            </Center>
            <Footer />
        </Box>
    );
};
