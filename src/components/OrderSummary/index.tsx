import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

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
  // To navigate other part of the app
  const location = useLocation();
  const navigate = useNavigate();

  // Routes
  const toOrderView = location.pathname && `/orderview/${orderId}`;

  // Function that will handle when you click some order
  const handleOnClick = () => {
    navigate(toOrderView, { replace: true });
  };

  return (
    <div>
      <Button
        onClick={handleOnClick}
        sx={{
          alignItems: 'flex-start',
          width: '97.5%',
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
