import React, { useEffect, useState } from 'react';
import NavBar from '../../components/PageSections/NavBar';
import Footer from "../../components/PageSections/Footer";
import ProductCard from '../../components/Products/ProductCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Box, Center, Flex, HStack, Text, Button, Spacer, Input, InputLeftElement, InputGroup, Divider } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchSellerProductsFromSpecificCategory, handleGetSellerItems, handleGetSellerDetails, handleGetAllSellers } from "../../redux/appActions/sellerActions";
import { Link } from 'react-router-dom';
import { CategoryFilters } from '../../components/Categories/CategoryFilters';
import { useHistory } from 'react-router';
import { AiOutlineSearch } from "react-icons/ai";

export const CompanyCategoryPage = () => {
    const sellerReducer = useSelector(({ sellerReducer }) => sellerReducer);
    const itemList = useSelector((state) => state.sellerReducer).categoryItems;
    const [itemsInCategoryList, setItemsInCategoryList] = useState([]);
    const { categoryName, sellerId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(handleSearchSellerProductsFromSpecificCategory(sellerId, categoryName));
        dispatch(handleGetSellerDetails(sellerId));
        dispatch(handleGetSellerItems(sellerId));
        dispatch(handleGetAllSellers());
    }, [categoryName, sellerId, dispatch]);

    useEffect(() => {
        setItemsInCategoryList(itemList);
    }, [itemList]);

    const [query, setQuery] = React.useState("");
    const [searchBarQuery, setSearchBarQuery] = React.useState("");

    React.useEffect(() => {
        const params = new URLSearchParams();
        if (query) {
            params.append("search", query);
        } else {
            params.delete("search");
        }
        setSearchBarQuery(params);
    }, [query]);

    const handleOnChange = (event) => {
        setQuery(event.target.value);

        const newOptions = itemList.filter((product) =>
            product.item_name.toLowerCase().includes(event.target.value) ||
            product.category.toLowerCase().includes(event.target.value) ||
            product.item_description.toLowerCase().includes(event.target.value)
        );

        setItemsInCategoryList(newOptions);
    };

    const onKeyEvent = (e) => {
        if (e.keyCode === 13) {
            history.push({ pathname: `/sellers/${sellerId}/items`, search: searchBarQuery.toString() });
        }
    };

    return (
        <Box flexDir="column" width="100%" height="100%" minHeight="100vh">
            <NavBar />
            {sellerReducer.sellerDetails.map((seller) => (
                <Box key={seller.id}>
                    <Box height={{ base: "200px", md: "300px" }} width="100%" bg="#000" />
                    <Center>
                        <Box
                            mt={5}
                            mb={5}
                            textAlign="center"
                            pos="absolute"
                            top={{ base: "20px", md: "40px" }}
                            color="white"
                            p={4}
                            as="span"
                            fontFamily="sans-serif"
                            textTransform="uppercase"
                            fontSize={{ base: "2em", md: "4em" }}
                        >
                            {seller.business_name}
                        </Box>
                    </Center>

                    <Flex
                        alignItems="center"
                        direction={{ base: "column", md: "row" }}
                        p={5}
                        wrap="wrap"
                    >
                        <Breadcrumb
                            textSize="1.5em"
                            fontFamily="monospace"
                            textTransform="uppercase"
                            spacing="8px"
                            separator={<MdKeyboardArrowRight color="gray.500" />}
                        >
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem as={Link} to={`/sellers/${seller.id}/${seller.business_name}`}>
                                <BreadcrumbLink>{seller.business_name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink>{categoryName}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Spacer />
                        {/* Search bar */}
                        <Box mt="20px" mr={{ base: 0, md: 20 }} width="100%">
                            <HStack spacing={3} alignItems="center" width="100%">
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiOutlineSearch />}
                                    />
                                    <Input
                                        width="100%"
                                        maxWidth="500px"
                                        value={query}
                                        onKeyDown={onKeyEvent}
                                        onChange={handleOnChange}
                                        placeholder="Search..."
                                    />
                                </InputGroup>
                            </HStack>
                        </Box>
                    </Flex>

                    <Center>
                        <HStack spacing="20px" mt={2} alignItems="start" width="100%" wrap="wrap">
                            <CategoryFilters categoriesList={sellerReducer.sellerItems} seller_name={seller.business_name} />
                            <Flex p={4} height="auto" bg="#F5F5F5" borderRadius="10px" width={{ base: "100%", md: "65vw" }} flexWrap="wrap">
                                <Flex flexDir="column" width="100%">
                                    <Flex p={2} alignItems="center">
                                        <Text p={2} fontWeight="bold">{seller.business_name}</Text>
                                        <Spacer />
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
                                    <Divider width="100%" />
                                    <Text p={4} fontWeight="bold">{itemsInCategoryList.length} items found</Text>
                                    <Divider width="100%" mb={2} />
                                    <Flex flexWrap="wrap">
                                        {itemsInCategoryList.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                price={product.item_price}
                                                sellerId={seller.id}
                                                product={product}
                                                id={product.id}
                                                company_image={product.item_seller.profile_pic}
                                                photo={product.item_main_image}
                                                category={product.category}
                                                name={product.item_name}
                                                description={product.item_description}
                                                companyName={seller.business_name}
                                            />
                                        ))}
                                    </Flex>
                                </Flex>
                                {sellerReducer.categoryItems.length === 0 && <Text p={20}>There are no products here</Text>}
                            </Flex>
                        </HStack>
                    </Center>
                </Box>
            ))}
            <Footer />
        </Box>
    );
};
