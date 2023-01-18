import { Box, Button } from '@mui/material';

interface Props {
  orderId: number;
  active: boolean;
}

const OrderSummary = ({ orderId, active }: Props) => {
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
            <strong>Client:</strong> Jonathan Castillo
          </Box>

          <Box>
            <strong>Courier:</strong> Gabriel Osorno
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
            <strong>12 Jan, 01:13 p.m.</strong>
            <strong>Pending</strong>
          </Box>

          <Box>
            <strong>Address:</strong> C 38 # 283 X 38 Y 21, PENSIONES
          </Box>
        </Box>
      </Button>
    </div>
  );
};

export default OrderSummary;
