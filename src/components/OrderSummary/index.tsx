import { Box, Button } from '@mui/material';

interface Props {
  active: boolean;
  clientAddress: string;
  clientName: string;
  courierName: string;
  orderDate: string;
  orderId: number;
  orderStatus: string;
}

const OrderSummary = ({
  active,
  clientAddress,
  clientName,
  courierName,
  orderDate,
  orderId,
  orderStatus,
}: Props) => {
  return (
    <div>
      <Button
        sx={{
          alignItems: 'flex-start',
          width: '97%',
          backgroundColor: '#fe4730',
          borderRadius: '8px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '2vh',
          marginTop: '2vh',
          padding: '1.5%',
          textAlign: 'left',
          ':hover': {
            backgroundColor: '#c40013',
          },
        }}
      >
        <Box sx={{ width: '40%' }}>
          <Box sx={{ fontSize: '1.3rem', marginBottom: '1vh' }}>
            <strong>Order # {orderId}</strong>
          </Box>

          <Box>
            <strong>Client:</strong> {clientName}
          </Box>

          <Box>
            <strong>Courier:</strong> {courierName}
          </Box>
        </Box>

        <Box sx={{ width: '60%' }}>
          <Box
            sx={{
              fontSize: '1.3rem',
              marginBottom: '1vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <strong>{orderDate}</strong>
            <strong>{orderStatus}</strong>
          </Box>

          <Box>
            <strong>Address:</strong> {clientAddress}
          </Box>
        </Box>
      </Button>
    </div>
  );
};

export default OrderSummary;
