import React, { useEffect } from 'react';
import NavBar from '../../components/PageSections/NavBar';
import Footer from '../../components/PageSections/Footer';
import {
  Box,
  Flex,
  Center,
  Text,
  Divider,
  HStack,
  Spacer,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlineSearch } from 'react-icons/ai';
import ProductCard from '../../components/Products/ProductCard';
import { CategoryFilters } from '../../components/Categories/CategoryFilters';
import {
  handleGetSellerItems,
  handleGetSellerDetails,
  handleGetAllSellers,
} from '../../redux/appActions/sellerActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const CompanyProductPage = () => {
  const sellerReducer = useSelector(({ sellerReducer }) => sellerReducer);
  const itemList = useSelector((state) => state.sellerReducer).sellerItems;
  const [searchedItems, setSearchedItems] = React.useState([]);

  const { sellerId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetAllSellers());
    dispatch(handleGetSellerDetails(sellerId));
    dispatch(handleGetSellerItems(sellerId));
  }, [sellerId, dispatch]);

  useEffect(() => {
    setSearchedItems(itemList);
  }, [itemList]);

  const [query, setQuery] = React.useState('');
  const history = useHistory();
  const [searchBarQuery, setSearchBarQuery] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (query) {
      params.append('search', query);
    } else {
      params.delete('search');
    }
    setSearchBarQuery(params);
  }, [query, history]);

  const handleOnChange = (event) => {
    setQuery(event.target.value);
    const newOptions = itemList.filter(
      (product) =>
        product.item_name.toLowerCase().includes(event.target.value) ||
        product.category.toLowerCase().includes(event.target.value) ||
        product.item_description.toLowerCase().includes(event.target.value)
    );

    setSearchedItems(newOptions);
  };

  const onKeyEvent = (e) => {
    if (e.keyCode === 13) {
      history.push({
        pathname: `/sellers/${sellerId}/items`,
        search: searchBarQuery.toString(),
      });
    }
  };

  return (
    <Box flexDir="column" width="100%" minHeight="100vh">
      <NavBar />
      {sellerReducer.sellerDetails.map((seller) => {
        return (
          <>
            <Box>
              <Box height={{ base: '150px', md: '300px' }} width="100%" bg="#000" />
              <Center>
                <Box
                  mt={5}
                  mb={5}
                  textAlign="center"
                  pos="absolute"
                  top={{ base: 20, md: 40 }}
                  color="white"
                  p={4}
                  as="span"
                  fontFamily="sans-serif"
                  textTransform="uppercase"
                  fontSize={{ base: '2em', md: '4em' }}
                >
                  {seller.business_name}
                </Box>
              </Center>
            </Box>

            <Flex alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
              <Breadcrumb
                p={5}
                fontSize="1em"
                fontFamily="monospace"
                textTransform="uppercase"
                ml={{ base: 5, md: 20 }}
                spacing="8px"
                separator={<MdKeyboardArrowRight color="gray.500" />}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={{ pathname: `/` }}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{seller.business_name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Spacer />
              {/* Search bar */}
              <Box mt="20px" mr={{ base: 5, md: 20 }}>
                <HStack spacing={3} alignItems="center">
                  <InputGroup display={{ base: 'none', lg: 'block' }} ml="auto">
                    <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
                    <Input
                      w={{ base: '60vw', lg: '30vw' }}
                      value={query}
                      onKeyDown={onKeyEvent}
                      onChange={(event) => handleOnChange(event)}
                      type="tel"
                      placeholder="Search..."
                    />
                  </InputGroup>
                </HStack>
              </Box>
            </Flex>

            <Center>
              <HStack
                spacing={{ base: '10px', lg: '20px' }}
                mt={2}
                alignItems="top"
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <CategoryFilters categoriesList={sellerReducer.sellerItems} seller_name={seller.business_name} />
                <Flex
                  p={4}
                  bg="#F5F5F5"
                  borderRadius="10px"
                  width={{ base: '90vw', md: '65vw' }}
                  flexWrap="wrap"
                  flexDir="column"
                 
                >
                  <Flex p={2} flexDir={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Text p={2} fontWeight="bold">
                      {seller.business_name}
                    </Text>
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
                  <Divider width={{ base: '80vw', md: '63vw' }} />
                  <Text p={4} fontWeight="bold">
                    {searchedItems.length} items found
                  </Text>
                  <Divider width={{ base: '80vw', md: '63vw' }} mb={2} />
                  <Flex flexWrap="wrap" justifyContent={{ base: 'center', md: 'flex-start' }}>
                    {searchedItems.map((product) => {
                      return (
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
                      );
                    })}
                  </Flex>
                  {sellerReducer.sellerItems.length === 0 && (
                    <Text p={20}>There are no products here</Text>
                  )}
                </Flex>
              </HStack>
            </Center>
          </>
        );
      })}
    </Box>
  );
};

export default CompanyProductPage;
