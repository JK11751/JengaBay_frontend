import { Box, Flex, Spacer } from "@chakra-ui/layout";
import React from "react";
import NavBar from "../../components/PageSections/NavBar";
import ProductDetails from "./subs/ProductDetails";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../../components/PageSections/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductDetailsPage = () => {
  const productReducer = useSelector(({ productReducer }) => productReducer);

  return (
    <Box minHeight="100vh">
      <NavBar />
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        overflowY="hidden"
        p={{ base: 4, md: 6, lg: 8 }}
      >
        {/* Left section with breadcrumbs and image slider */}
        <Flex
          flexDirection="column"
          flex={{ base: "1", md: "2" }} // Adjust flex values
          align={{ base: "center", md: "flex-start" }}
        >
          {/* Breadcrumbs */}
          {productReducer.productDetails.map((product) => (
            <Breadcrumb
              key={product._id}
              mt={7}
              fontSize={{ base: "1em", md: "1.25em" }}
              fontFamily="monospace"
              textTransform="uppercase"
              spacing="8px"
              separator={<MdKeyboardArrowRight color="gray.500" />}
              mb={4}
              ml={{ base: 0, md: 4, lg: 20 }}
              textAlign={{ base: "center", md: "left" }}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink>Products</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  to={`/sellers/${product.item_seller.id}/${product.item_seller.business_name}`}
                >
                  {product.item_seller.business_name}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={`/categories/${product.category}`}>
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{product.item_name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          ))}

          {/* Image Slider */}
          <Box
            maxW={{ base: "100%", md: "100%" }} // Ensure full width for images
            mx={{ base: "auto", md: 0 }}
            mb={{ base: 4, md: 0 }}
            position="relative"
            height={{ base: "300px", md: "400px" }} // Set a fixed height to maintain aspect ratio
            overflow="hidden"
          >
            <ImageSlider />
          </Box>
        </Flex>

        

        {/* Right section with product details */}
        <Flex
          bgColor="#E9F6FF"
          alignItems="flex-start"
          flex={{ base: "1", md: "1" }}
          width={{ base: "100%", md: "50%" }}
          flexDir="column"
          p={{ base: 4, md: 6, lg: 8 }}
          mt={{ base: 6, md: 0 }}
        >
          <Box ml={{ base: 0, md: 5 }}>
            <ProductDetails />
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
};

export default ProductDetailsPage;
