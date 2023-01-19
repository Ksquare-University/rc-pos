import React, { useEffect, useState } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import OrderSummary from '../../components/OrderSummary';
import DefaultTemplateMenu from '../../templates/DefaultTemplateMenu';

const Orders: React.FC = () => {
  const [tab, setTab] = useState('1');

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
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
      <DefaultTemplateMenu>
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
              height: '65vh',
              overflow: 'scroll',
              paddingBottom: '0',
              paddingTop: '0',
              marginTop: '1vh',
            }}
          >
            <OrderSummary
              active={true}
              clientAddress={'C 38 # 283 X 38 Y 21, PENSIONES'}
              clientName={'Jonathan Castillo'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 10:31 a.m.'}
              orderId={9813}
              orderStatus={'Pending'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 47 # 739 X 34 Y 38, F. DE MONTEJO'}
              clientName={'Ivanna Nouel'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 12:03 p.m.'}
              orderId={9814}
              orderStatus={'Pending'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 32 # 124 X 45 Y 47, CHUBURNA'}
              clientName={'Carlos Reyes'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 12:05 p.m.'}
              orderId={9815}
              orderStatus={'Pending'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 34 # 523 X 32 Y 35, CAUCEL'}
              clientName={'Yira Gonzalez'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 12:05 p.m.'}
              orderId={9816}
              orderStatus={'Pending'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 25 # 351 X 14 Y 17, CENTRO'}
              clientName={'Juan Fernando'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 12:07 p.m.'}
              orderId={9817}
              orderStatus={'Pending'}
            />
          </TabPanel>
          <TabPanel
            value='2'
            sx={{
              width: '85vw',
              height: '65vh',
              overflow: 'scroll',
              paddingBottom: '0',
              paddingTop: '0',
              marginTop: '3vh',
            }}
          >
            <OrderSummary
              active={true}
              clientAddress={'C 47 # 739 X 34 Y 38, F. DE MONTEJO'}
              clientName={'Ivanna Nouel'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 10:05 a.m.'}
              orderId={9810}
              orderStatus={'Delivered'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 38 # 283 X 38 Y 21, PENSIONES'}
              clientName={'Jonathan Castillo'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 10:06 a.m.'}
              orderId={9811}
              orderStatus={'Delivered'}
            />
            <OrderSummary
              active={true}
              clientAddress={'C 13 # 412 X 23 Y 21, YUCALPETEN'}
              clientName={'Juan Pablo'}
              courierName={'Gabriel Osorno'}
              orderDate={'19 Jan, 10:06 a.m.'}
              orderId={9812}
              orderStatus={'Canceled'}
            />
          </TabPanel>
        </TabContext>
      </DefaultTemplateMenu>
    </Box>
  );
};

export default Orders;
