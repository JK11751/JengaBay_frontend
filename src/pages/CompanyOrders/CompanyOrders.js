import React, { useEffect } from 'react';
import NavBar from '../../components/PageSections/NavBar';
import Footer from '../../components/PageSections/Footer';
import { OrderItem } from '../../components/Orders/OrderItem';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, Tabs, TabList, TabPanels, Tab, TabPanel, Center, Text } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetSellerOrders } from '../../redux/appActions/orderActions';
import { getUser } from '../../utils/useToken';
import { handleGetSellerDetails } from '../../redux/appActions/sellerActions';

export const CompanyOrders = () => {
    const dispatch = useDispatch();
    const user = getUser();
    const userId = user ? user.account_id : null;

    const orderReducer = useSelector(({ orderReducer }) => orderReducer);
    const sellerReducer = useSelector(({ sellerReducer }) => sellerReducer);
    const [pending, setPending] = React.useState([]);

    useEffect(() => {
        if (userId) {
            dispatch(handleGetSellerOrders(userId));
            dispatch(handleGetSellerDetails(userId));
        } else {
            console.error("User ID is undefined. Unable to fetch seller orders and details.");
        }
        console.log("userId", userId);
    }, [dispatch, userId]);

    useEffect(() => {
        if (Array.isArray(orderReducer.sellerOrders)) {
            setPending(filterPendingOrders(orderReducer.sellerOrders, false));
        }
    }, [orderReducer.sellerOrders]);

    function filterPendingOrders(orders, criteria) {
        const pendingOrders = orders.filter(order => order.is_delivered === criteria);
        if (pendingOrders) {
            return pendingOrders.map(order => (
                <OrderItem
                    id={order.id}
                    seller_id={order.payment_transaction.recipient}
                    order={order}
                    key={order.id}
                />
            ));
        }
    }

    return (
        <div>
            <NavBar />
            <Box height="100vh">
                <Breadcrumb
                    p={5}
                    fontSize="1em"
                    fontFamily="monospace"
                    textTransform="uppercase"
                    ml={20}
                    spacing="8px"
                    separator={<MdKeyboardArrowRight color="gray.500" />}
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="#">Your-Account</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Center>
                    <Tabs width="90%">
                        <TabList>
                            <Tab>Orders</Tab>
                            <Tab>Pending Orders</Tab>
                            <Tab>Cancelled Orders</Tab>
                        </TabList>
                        <TabPanels>
                            {Array.isArray(orderReducer.sellerOrders) && (
                                <TabPanel id="Orders">
                                    {orderReducer.sellerOrders.length === 0 && (<Text> There are no orders here</Text>)}
                                    {orderReducer.sellerOrders.map(order => (
                                        <OrderItem
                                            sellerProfilePic={sellerReducer.sellerDetails.map(seller => seller.profile_pic)}
                                            seller_id={order.payment_transaction.recipient}
                                            id={order.id}
                                            order={order}
                                            {...order}
                                            key={order.id}
                                        />
                                    ))}
                                </TabPanel>
                            )}
                            {Array.isArray(orderReducer.sellerOrders) && (
                                <TabPanel id="Pending-Orders">
                                    {orderReducer.sellerOrders.length === 0 && (<Text> There are no pending orders</Text>)}
                                    {pending}
                                </TabPanel>
                            )}
                            {Array.isArray(orderReducer.cancelledOrders) && (
                                <TabPanel id="Cancelled-Orders">
                                    {orderReducer.cancelledOrders.length === 0 && (<Text> There are no cancelled orders</Text>)}
                                    {orderReducer.cancelledOrders.map(order => (
                                        <OrderItem
                                            seller_id={order.payment_transaction.recipient}
                                            id={order.id}
                                            order={order}
                                            {...order}
                                            key={order.id}
                                        />
                                    ))}
                                </TabPanel>
                            )}
                        </TabPanels>
                    </Tabs>
                </Center>
            </Box>
            <Footer />
        </div>
    );
};
