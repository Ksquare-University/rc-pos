import React, { useEffect, useState } from 'react';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import DefaultTemplateMenu from '../../templates/DefaultTemplateMenu';

const Orders: React.FC = () => {
  const [tab, setTab] = useState('1');

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#f0f0f0';
    document.body.style.color = '#fe4730';
    document.body.style.display = 'flex';
    document.body.style.placeItems = 'center';
    document.body.style.justifyContent = 'center';
    document.body.style.minWidth = '100vw';
    document.body.style.minHeight = '100vh';
  }, []);

  return (
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
            <Tab label='Delivered' value='2' />
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
          <OrderSummary orderId={9813} active={true} />
          <OrderSummary orderId={9814} active={true} />
          <OrderSummary orderId={9815} active={true} />
          <OrderSummary orderId={9816} active={true} />
          <OrderSummary orderId={9817} active={true} />
          <OrderSummary orderId={9818} active={true} />
          <OrderSummary orderId={9819} active={true} />
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
          <OrderSummary orderId={9809} active={false} />
          <OrderSummary orderId={9810} active={false} />
          <OrderSummary orderId={9811} active={false} />
        </TabPanel>
      </TabContext>
    </DefaultTemplateMenu>
  );
};

export default Orders;
