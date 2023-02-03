/* Imports */
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import OrderSummary from '../../components/OrderSummary';
import DefaultTemplateMenu from '../../templates/DefaultTemplateMenu';
import { useDataContext } from '../../context/IncommingOrderContext';

/* Orders component */
const Orders: FC = () => {
  const context = useDataContext();
  /* State that stores which tab is being displayed */
  const [tab, setTab] = useState('1');
  /* State that stores the current order list */
  const [orderList, setOrderList] = useState([]);
  /* Token from context */
  const token = context.userToken;

  /* Fetching the orders when the component gets mounted */
  useEffect(() => {
    fetchOrders();
  }, []);

  /* Function that will fetch the orders list */
  const fetchOrders = async () => {
    try {
      const orderListResponse = await fetch(
        `http://localhost:3010/orders/byRestaurant/${context.restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const orderList = await orderListResponse.json();

      context.setOrdersList(orderList);
      setOrderList(orderList);
    } catch (error) {
      console.error(error);
    }
  };

  /* Function that handles which tab is being displayed */
  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box
      bgcolor='#f0f0f0'
      color='#fe4730'
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100vw'
      minHeight='100vh'
    >
      <DefaultTemplateMenu isOpen={true}>
        <Typography fontFamily={'Quicksand'} textAlign='center' variant='h3'>
          Orders
        </Typography>

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              TabIndicatorProps={{ style: { background: '#fe4730' } }}
              onChange={handleTabChange}
              textColor='inherit'
              aria-label='Orders tabs'
            >
              <Tab label='Active' value='1' />
              <Tab label='Inactive' value='2' />
            </TabList>
          </Box>
          <TabPanel
            value='1'
            sx={{
              width: '85vw',
              height: '70vh',
              overflow: 'scroll',
              paddingBottom: '0',
              paddingTop: '0',
              marginTop: '1vh',
            }}
          >
            {orderList?.map((order: any) => {
              const orderSatus = order.order_status;

              if (orderSatus.id > 0 && orderSatus.id < 5) {
                const orderDate = new Date(order.createdAt);
                const orderDateDate = orderDate.toDateString();
                const orderDateTime = orderDate.toLocaleTimeString();

                return (
                  <OrderSummary
                    active={true}
                    clientAddress={order.Customer.ClientAddress.address}
                    clientName={order.Customer.full_name}
                    courierName={order.courier.full_name}
                    orderDate={`${orderDateDate}, ${orderDateTime}`}
                    orderId={order.id}
                    orderStatus={orderSatus.name}
                  />
                );
              }
            })}
          </TabPanel>
          <TabPanel
            value='2'
            sx={{
              width: '85vw',
              height: '70vh',
              overflow: 'scroll',
              paddingBottom: '0',
              paddingTop: '0',
              marginTop: '1vh',
            }}
          >
            {orderList?.map((order: any) => {
              const orderSatus = order.order_status;

              if (orderSatus.id > 4 && orderSatus.id < 7) {
                const orderDate = new Date(order.createdAt);
                const orderDateDate = orderDate.toDateString();
                const orderDateTime = orderDate.toLocaleTimeString();

                return (
                  <OrderSummary
                    active={true}
                    clientAddress={order.Customer.ClientAddress.address}
                    clientName={order.Customer.full_name}
                    courierName={order.courier.full_name}
                    orderDate={`${orderDateDate}, ${orderDateTime}`}
                    orderId={order.id}
                    orderStatus={orderSatus.name}
                  />
                );
              }
            })}
          </TabPanel>
        </TabContext>
      </DefaultTemplateMenu>
    </Box>
  );
};

export default Orders;
