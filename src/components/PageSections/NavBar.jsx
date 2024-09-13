import React from "react";
import CartIcon from "../Products/cartIcon";
import icon from "../../assets/JengaBay.png";
import { Image } from "@chakra-ui/image";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/icon";
import SideBar from "./SideBar";
import {
  chakra,

  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,

} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { LogoutDialogue } from "../LogoutDialogue";
import { useDisclosure } from "@chakra-ui/hooks";
import { getUser } from "../../utils/useToken";

const NavBar = () => {
  const sellerId = getUser()?.account_id;
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const handleToggle = (setting) => setShow(setting);
  const cart = useSelector(({ cartReducer }) => cartReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = getUser();

  const handleOpenCart = () => {
    history.push("/cart");
  };

  return (
    <React.Fragment>
      <chakra.header
        background="#007ACC"
        w="100%"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        top={0}
        zIndex="200"
        position="sticky"
      >
        <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
          {/* Mobile view */}
          <HStack spacing={3} alignItems="center" display={{ base: "flex", md: "none" }}>
            <Link to="/">
              <Image src={icon} />
            </Link>
            <SearchBar />
            <CartIcon handleOpenCart={handleOpenCart} number={cart.cartItems.length} display={{ base: "flex", md: "none" }} />
            <Menu isLazy>
              <MenuButton p={0} bg="transparent">
                <Icon color="#fff" h={7} w={7} as={MdOutlineAccountCircle} />
                <Icon color="#fff" h={5} w={4} as={IoIosArrowDown} />
              </MenuButton>
              <MenuList>
                {user && (
                  <>
                    <MenuGroup fontWeight="bold" title="Profile">
                      <MenuItem onClick={() => history.push({ pathname: `/sellers/${sellerId}/profile` })}>
                        My Account
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                  </>
                )}
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem onClick={() => history.push({ pathname: `/about` })}>About</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                {!user ? (
                  <>
                    <MenuItem>
                      <Button
                        h="30px"
                        fontWeight="500"
                        fontSize="13px"
                        w="130px"
                        textColor="#18A0FB"
                        background="#fff"
                        variant="outline"
                        onClick={() => history.push({ pathname: "/signup" })}
                      >
                        Sign Up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        h="30px"
                        w="130px"
                        fontWeight="500"
                        fontSize="13px"
                        textColor="#000"
                        colorScheme="#18A0FB"
                        background="#18A0FB"
                        variant="solid"
                        onClick={() => history.push({ pathname: "/login" })}
                      >
                        Login
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={() => onOpen()}>LOG OUT</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </HStack>

          {/* Desktop view */}
          <HStack display={{ base: "none", md: "flex" }} spacing={3} alignItems="center" justifyContent="space-between" pr={4}>
            <Link to="/">
              <Image src={icon} />
            </Link>
            <SearchBar />
            <chakra.a
              p={3}
              color={useColorModeValue("gray.800", "inherit")}
              rounded="sm"
              _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
              onClick={handleOpenCart}
            >
              <CartIcon number={cart.cartItems.length} />
              <VisuallyHidden>Shopping Cart</VisuallyHidden>
            </chakra.a>
            <Menu isLazy>
              <MenuButton p={0} bg="transparent">
                <Icon color="#fff" h={7} w={7} as={MdOutlineAccountCircle} />
                <Icon color="#fff" h={5} w={4} as={IoIosArrowDown} />
              </MenuButton>
              <MenuList>
                {user && (
                  <>
                    <MenuGroup fontWeight="bold" title="Profile">
                      <MenuItem onClick={() => history.push({ pathname: `/sellers/${sellerId}/profile` })}>
                        My Account
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                  </>
                )}
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem onClick={() => history.push({ pathname: `/about` })}>About</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                {!user ? (
                  <>
                    <MenuItem>
                      <Button
                        h="30px"
                        fontWeight="500"
                        fontSize="13px"
                        w="130px"
                        textColor="#18A0FB"
                        background="#fff"
                        variant="outline"
                        onClick={() => history.push({ pathname: "/signup" })}
                      >
                        Sign Up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        h="30px"
                        w="130px"
                        fontWeight="500"
                        fontSize="13px"
                        textColor="#000"
                        colorScheme="#18A0FB"
                        background="#18A0FB"
                        variant="solid"
                        onClick={() => history.push({ pathname: "/login" })}
                      >
                        Login
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={() => onOpen()}>LOG OUT</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </chakra.header>
      <SideBar show={show} handleToggle={handleToggle} />
      <LogoutDialogue isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};

export default NavBar;
